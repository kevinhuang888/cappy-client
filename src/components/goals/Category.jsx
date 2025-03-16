import React from 'react'
import GoalItem from './GoalItem'
import './category.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'

export default function Category({category,toggleActive,index,toggleEditGoal,editGoalText,setGoalContent,
                                    addBlankGoal,removeGoal,toggleGoalRepeat,addGoal,stars,setStars}) {
    
    
    const handleArrowClick = () => {
        toggleActive(index)
    }

    return (
    <li className="category">
        <div className="catContainer">
            <div className="iconContainer">
                {!category.active && <ChevronRightIcon className={"arrow " + (category.goalList.length > 0 && "show")} onClick={handleArrowClick} />}
                {category.active && <ExpandMoreIcon className={"arrow " + (category.goalList.length > 0 && "show")} onClick={handleArrowClick} />}
            </div>
            <span className="catName">{category.name}</span>
            <div className="iconContainer">
                <AddIcon className="add" onClick={() => addBlankGoal(index)}/>
            </div>
            <div className="emptySpace"></div>
        </div>
        <ul className={"goalList " + (category.active && "active")}>
            {category.goalList.map((goal,goalIndex) => (
                <GoalItem key={goalIndex} goal={goal} goalIndex={goalIndex} toggleEditGoal={toggleEditGoal} editGoalText={editGoalText} catIndex={index} setGoalContent={setGoalContent} 
                removeGoal={removeGoal} toggleGoalRepeat={toggleGoalRepeat} addGoal={addGoal} stars={stars} setStars={setStars}/>
            ))}
        </ul>
    </li>
    )
}