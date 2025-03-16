import React from 'react'
import './newCategory.css'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'

function NewCategory({setNewCategory,addCategory}) {
    
    const [name,setName] = useState("Untitled Category")

    const handleTextChange = (e) => {
        setName(e.target.value)
    }

    const handleConfirm = () => {
        addCategory(name)
        setName("Untitled Category")
        setNewCategory(false)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleConfirm()
        }
    }

  return (
    <div className="newCategory">
        <div className="top">
            <div className="title">
                New Category
            </div>
            <div className="emptySpace">
                
            </div>
            <div className="close">
                <CloseIcon className="closeIcon" onClick={() => setNewCategory(false)}/>
            </div>
        </div>
        <div className="middle">
            <input className="catInput" onChange={(e) => handleTextChange(e)} onKeyDown={(e) => handleKeyDown(e)} placeholder="Untitled Category"></input>
        </div>
        <div className="bottom">
            <div className="buttonArea">
                <button className="buttons" onClick={() => setNewCategory(false)}>Cancel</button>
                <button className="buttons" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default NewCategory