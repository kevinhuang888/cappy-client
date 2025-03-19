import React from 'react'
import './goals.css'
import Category from './Category'
import title from '../../assets/goals/title.png'
import { useState,useEffect } from 'react'
import Header from '../header/Header'
import NewCategory from './NewCategory'
import NewGoal from './NewGoal'

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

  const toggleGoalRepeat = (goalIndex,categoryObj) => {
    console.log(`categoryObj: ${JSON.stringify(categoryObj)}`)
    if(categoryObj){
      categoryObj.goalList[goalIndex].repeat = !categoryObj.goalList[goalIndex].repeat
      putCategory(categoryObj)
    }
    else{
      console.error("Can't find Category ID")
    }
  }

  const addCategory = (name) => {

    const newCat = {
      name:name,
      goalList:[]
    }

    postCategory(newCat)

    newCat.active=false
    const newCategories = [...categories]
    newCategories.push(newCat)
    setCategories(newCategories)
  }
  
  const addGoal = (goal) => {
    postGoal(goal)
    const categoryObj = getCategoryById(currCategory._id)
    console.log(`categoryObj: ${categoryObj}`)
    if(categoryObj){
      categoryObj.goalList.push(goal)
      putCategory(categoryObj)
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

  //APIs
  async function getCategories() {
    try{
      const response = await fetch(`http://localhost:5002/category/`)
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }
      const categories = await response.json()
      setCategories(categories)
    } catch(err){
      console.error(err.message)
    }
  }

  async function postCategory(newCategory) {
    try{
      const response = await fetch(`http://localhost:5002/category/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newCategory)
      })
      if(!response.ok){
        throw new Error(`postCategoryResponse status: ${response.status}`)
      }
      const category = await response.json()
      console.log(`New Category created: ${category}`)

    } catch(err){
      console.error(err.message)
    }
  }

  async function putCategory(newCategory) {
    try{
      const response = await fetch(`http://localhost:5002/category/${newCategory._id}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newCategory)
      })
      if(!response.ok){
        throw new Error(`putCategoryResponse status: ${response.status}`)
      }
      const category = await response.json()
      console.log(`Category: ${JSON.stringify(category.name)} Updated`)
      setCategoryById(newCategory._id,newCategory)

    } catch(err){
      console.error(err.message)
    }
  }

  async function postGoal(newGoal) {
    try{
      const response = await fetch(`http://localhost:5002/goal/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newGoal)
      })
      if(!response.ok){
        throw new Error(`postGoal status: ${response.status}`)
      }
      const goal = await response.json()
      console.log(`New Goal created: ${goal}`)

    } catch(err){
      console.error(err.message)
    }
  }

  //Effects
  useEffect(() => {
    getCategories()
    return
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
