import React from 'react'
import './goals.css'
import Category from './Category'
import title from '../../assets/goals/title.png'
import { useState } from 'react'
import Header from '../header/Header'
import NewCategory from './NewCategory'

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

  const toggleActive = (index) => {
    const newCategories = [...categories]
    newCategories[index].active = !newCategories[index].active
    setCategories(newCategories)
  }

  const setActive = (index) => {
    const newCategories = [...categories]
    newCategories[index].active = true
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

  const addBlankGoal = (catIndex) => {
    const newCategories = [...categories]
    const newGoal = goalTemplate
    newCategories[catIndex].goalList.push(newGoal)
    setActive(catIndex)
    setCategories(newCategories)
  }

  const addGoal = (catIndex,newGoal) => {
    const newCategories = [...categories]
    newCategories[catIndex].goalList.push(newGoal)
    setActive(catIndex)
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
    const newCategories = [...categories]
    const newCat = catTemplate
    newCat.name = name
    newCategories.push(newCat)
    setCategories(newCategories)
  }

  return (
    <div className="goals" id="goals">
      <Header stars={stars} />
      {newCategory && <NewCategory setNewCategory={setNewCategory} addCategory={addCategory} />}
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
                  <Category key={index} category={category} toggleActive={toggleActive} index={index} toggleEditGoal={toggleEditGoal} 
                  editGoalText={editGoalText} setGoalContent={setGoalContent} addBlankGoal={addBlankGoal} 
                  removeGoal={removeGoal} toggleGoalRepeat={toggleGoalRepeat} addGoal={addGoal} stars={stars} setStars={setStars} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
