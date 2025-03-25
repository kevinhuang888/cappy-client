import React from 'react'
import './goalItem.css'
import checked from '../../assets/goals/checked.png'
import repeat from '../../assets/goals/repeat.png'
import star from '../../assets/goals/Star.png'
import { useState, useEffect } from 'react'
import * as restApi from './GoalsApi'

export default function GoalItem({goalId,goalIndex,toggleEditGoal,editGoalText,catIndex,setGoalContent,removeGoal,
                                    toggleGoalRepeat,addGoal,stars,setStars,category}) {

    const [goal,setGoal] = useState({})

    const handleTextChange = (e) => {
        editGoalText(catIndex,goalIndex,e.target.value)
    }

    const handleSubmit = (e) => {
        if(e.key === "Enter"){
            setGoalContent(catIndex,goalIndex)
            toggleEditGoal(catIndex,goalIndex)
            editGoalText(catIndex,goalIndex,"")
        }
    }
    
    const handleGoalCompleted = () => {
        if(goal.repeat){
            const tempGoal = goal;
            removeGoal(catIndex,goalIndex)
            addGoal(catIndex,tempGoal)
        }
        else{
            removeGoal(catIndex,goalIndex)
        }
        setStars(stars+goal.stars)
    }

    const handleGoalRepeat = () => {
        toggleGoalRepeat(goalIndex,category)
    }

    useEffect(() => {
        async function renderGoal(){
            const goal_res = await restApi.getGoalById(goalId)
            setGoal(goal_res)
            return
        }
        renderGoal()
    },[])

  return (
    <li className="goalItem">
        <div className="imgContainer">
            <img src={checked} alt="Checked" className="check" onClick={handleGoalCompleted}/>
        </div>
        <div className="content">
            {!goal.edit && <span>{goal.content}</span>}
            {goal.edit && <input value={goal.tempInput} onChange={(e) => handleTextChange(e)} onKeyDown={(e) => handleSubmit(e)}></input>}
        </div>
        <div className="imgContainer">
            <img src={repeat} alt="Repeat" className={"repeat " + (goal.repeat && "active")} onClick={handleGoalRepeat} />
        </div>
        <div className="starContainer">
            <span>{goal.stars}</span>
            <img src={star} alt="Star" />
        </div>
    </li>
  )
}
