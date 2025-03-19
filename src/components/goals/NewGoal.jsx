import React from 'react'
import './newGoal.css'
import repeat from '../../assets/goals/repeat.png'
import star from '../../assets/goals/Star.png'
import { useState } from 'react'

function NewGoal({setNewGoal,addGoal,currCategory, setCurrCategory}) {

    const [goalInput,setGoalInput] = useState("")
    const [starInput,setStarInput] = useState("")
    const [repeatInput,setRepeatInput] = useState(false)

    const handleGoalInputChange = (e) => {
        setGoalInput(e.target.value)
    }

    const handleStarInputChange = (e) => {
        setStarInput(e.target.value)
    }

    const handleCancel = () => {
        setCurrCategory({})
        setNewGoal(false)
    }

    const handleConfirm = () => {
        const newGoal = {}
        newGoal.content = goalInput
        newGoal.stars = starInput
        newGoal.repeat = repeatInput

        addGoal(newGoal)
        setNewGoal(false)
        setCurrCategory({})
        console.log(`Goal: ${goalInput}, Star:${starInput}`)
    }

  return (
    <div className="newGoal">  
        <div className="top">
            <input className="goalInput" onChange={(e) => handleGoalInputChange(e)} placeholder="New Goal"></input>
            <div className="imgContainer">
                <img src={repeat} className="repeat" alt="Repeat" />
            </div>
        </div> 
        <div className="category">
            <span>Category: {currCategory.name}</span>
        </div>
        <div className="starArea">
            <div className="imgContainer">
                <img src={star} className="star" alt="Star" />
            </div>
            <input className="starInput" onChange={(e) => handleStarInputChange(e)}></input>
           
        </div>
        <div className="desc">
            <span>Description</span>
            <textarea className="descInput"></textarea>
        </div>
        <div className="bottom">
            <div className="buttonArea">
                <button className="buttons" onClick={handleCancel}>Cancel</button>
                <button className="buttons" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default NewGoal