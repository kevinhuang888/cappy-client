import React from 'react'
import './goalItem.css'
import checked from '../../assets/goals/checked.png'
import repeat from '../../assets/goals/repeat.png'
import star from '../../assets/goals/Star.png'

export default function GoalItem({goal,goalIndex,toggleEditGoal,editGoalText,catIndex,setGoalContent,removeGoal,
                                    toggleGoalRepeat,addGoal,stars,setStars}) {

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

    const handleTextClick = () => {
        editGoalText(catIndex,goalIndex,goal.content)
        toggleEditGoal(catIndex,goalIndex)
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
        toggleGoalRepeat(catIndex,goalIndex)
    }

  return (
    <li className="goalItem">
        <div className="imgContainer">
            <img src={checked} alt="Checked" className="check" onClick={handleGoalCompleted}/>
        </div>
        <div className="content">
            {!goal.edit && <span onClick={handleTextClick}>{goal.content}</span>}
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
