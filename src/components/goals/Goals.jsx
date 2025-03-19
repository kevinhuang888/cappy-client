import React from 'react'
import './goals.css'
import Category from './Category'
import title from '../../assets/goals/title.png'
import { useState,useEffect } from 'react'
import Header from '../header/Header'
import NewCategory from './NewCategory'
import NewGoal from './NewGoal'

export default function Goals({stars,setStars}) {

  const sampleGoalList1 = [
    {
      id:1,
      content:"Dribble a Basketball 5 times",
      completed:false,
      repeat:false,
      stars:3,
      edit:false,
      tempInput:""
    },
    {
      id:2,
      content:"Play 10 hours of Fortnite",
      completed:false,
      repeat:false,
      stars:19,
      edit:false,
      tempInput:""
    }
  ]

  const goalTemplate = 
    {
      id:1,
      content:"Sample Goal",
      completed:false,
      repeat:false,
      stars:3,
      edit:true,
      tempInput:""
    }

    const catTemplate = 
    {
      name:"Untitled Category",
      active:false,
      goalList:[]
    }
  

    //Delete Later
  const sampleCategories = [
    {
        name:"Category 1",
        active:false,
        goalList:sampleGoalList1
    },
    {
      name:"Category 2",
      active:false,
      goalList:[]
  }
]
  const [categories,setCategories] = useState([])
  const [newCategory,setNewCategory] = useState(false);
  const [newGoal,setNewGoal] = useState(false);
  const [currCategory,setCurrCategory] = useState({})

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

  const toggleGoalRepeat = (catIndex,goalIndex) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList[goalIndex].repeat = !newCategories[catIndex].goalList[goalIndex].repeat
    setCategories(newCategories)
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
      const response = await fetch(`http://localhost:5002/category/${currCategory._id}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json', // Ensure the body is sent as JSON
        },
        body: JSON.stringify(newCategory)
      })
      if(!response.ok){
        throw new Error(`postCategoryResponse status: ${response.status}`)
      }
      const category = await response.json()
      console.log(`New Category: ${JSON.stringify(category)} Added`)
      console.log(`New Category List: ${JSON.stringify(categories)}`)

    } catch(err){
      console.error(err.message)
    }
  }

  const addGoal = (goal) => {
    postGoal(goal)
    const newCategories = [...categories]
    const categoryObj = newCategories.find(categories => categories._id === currCategory._id)
    console.log(`categoryObj: ${categoryObj}`)
    if(categoryObj){
      categoryObj.goalList.push(goal)
      putCategory(categoryObj)
      categoryObj.active=true
    }
    else{
      console.err("Can't find Category ID")
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
