import React from 'react'
import './goals.css'
import Category from './Category'
import title from '../../assets/goals/title.png'
import { useState,useEffect } from 'react'
import Header from '../header/Header'
import NewCategory from './NewCategory'
import NewGoal from './NewGoal'
import * as restApi from './GoalsApi'

export default function Goals({stars,setStars}) {

  //States
  const [categories,setCategories] = useState([])
  const [newCategory,setNewCategory] = useState(false);
  const [newGoal,setNewGoal] = useState(false);
  const [currCategory,setCurrCategory] = useState({})

  //Funcs
  const toggleActive = (index) => {
    const newCategories = [...categories]
    newCategories[index].active = !newCategories[index].active
    setCategories(newCategories)
  }

  const toggleEditGoal = (catIndex, goalIndex) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList[goalIndex].edit = !newCategories[catIndex].goalList[goalIndex].edit
    setCategories(newCategories)
  }
  const editGoalText = (catIndex, goalIndex, content) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList[goalIndex].tempInput = content
    setCategories(newCategories)
  }


  const removeGoal = (catIndex,goalIndex) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList.splice(goalIndex,1)
    setCategories(newCategories)
  }
  
  const setGoalContent = (catIndex,goalIndex) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList[goalIndex].content = newCategories[catIndex].goalList[goalIndex].tempInput
    setCategories(newCategories)
  }

  const toggleGoalRepeat = async (goalIndex,categoryObj) => {
    console.log(`categoryObj: ${JSON.stringify(categoryObj)}`)
    if(categoryObj){
      categoryObj.goalList[goalIndex].repeat = !categoryObj.goalList[goalIndex].repeat
      const newCategory = await restApi.putCategory(categoryObj)
      setCategoryById(newCategory._id,newCategory)
    }
    else{
      console.error("Can't find Category ID")
    }
  }

  const addCategory = async (name) => {

    const newCat = {
      name:name,
      goalList:[]
    }

    const postedCat = await restApi.postCategory(newCat)

    postedCat.active=false
    const newCategories = [...categories]
    newCategories.push(postedCat)
    setCategories(newCategories)
  }
  
  const addGoal = async (goal) => {
    const newGoal = await restApi.postGoal(goal)
    console.log(`[addGoal] ${newGoal._id}`)
    const categoryObj = getCategoryById(currCategory._id)
    if(categoryObj){
      categoryObj.goalList.push(newGoal._id)
      const newCategory = await restApi.putCategory(categoryObj)
      setCategoryById(newCategory._id,newCategory)
      categoryObj.active=true
    }
    else{
      console.error("Can't find Category ID")
    }
  }

  const getCategoryById = (id) => {
    const newCategories = [...categories]
    return newCategories.find(categories => categories._id === id)
  }
  const setCategoryById = (id,newCat) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category._id === id ? {...category,value:newCat} : category
      ))
  }



  //Effects
  useEffect(() => {
    async function renderCategories(){
      const newCategories = await restApi.getCategories()
      setCategories(newCategories)
      return
    }
    renderCategories()
  },[])
  

  return (
    <div className="goals" id="goals">
      <Header stars={stars} />
      {newCategory && <NewCategory setNewCategory={setNewCategory} addCategory={addCategory} />}
      {newGoal && <NewGoal setNewGoal={setNewGoal} addGoal={addGoal} currCategory={currCategory} setCurrCategory={setCurrCategory} />}
      <div className={"goalBody " + (newCategory && "blur")}>
        <div className="goalFrame">
          <div className="goalContainer">
            <div className="titleContainer">
              <img src={title} alt="Goals" />
            </div>
            <div className="buttonContainer">
              <button onClick={() => setNewCategory(true)}>+ New Category</button>
            </div>
            <div className="categoryList">
              <ul>
                {categories.map((category,index) => (
                  <Category key={category._id} category={category} toggleActive={toggleActive} index={index} toggleEditGoal={toggleEditGoal} 
                  editGoalText={editGoalText} setGoalContent={setGoalContent} setCurrCategory={setCurrCategory}
                  removeGoal={removeGoal} toggleGoalRepeat={toggleGoalRepeat} addGoal={addGoal} stars={stars} setStars={setStars}
                  setNewGoal={setNewGoal} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
