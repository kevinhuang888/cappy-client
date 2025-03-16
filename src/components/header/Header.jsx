import './header.css'
import profile from '../../assets/home/Profile.png'
import goals from '../../assets/home/Goals.png'
import shop from '../../assets/home/Shop.png'
import star from '../../assets/home/Star.png'
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react'

export default function Header({stars}){

    const defaultNav = [
        {
            name:"profile",
            link:"/profile",
            src:profile,
            alt:"Profile",
            isHover:false,
            isShift:false
        },
        {
            name:"goals",
            link:"/goals",
            src:goals,
            alt:"Goals",
            isHover:false,
            isShift:false
        },
        {
            name:"shop",
            link:"/shop",
            src:shop,
            alt:"Shop",
            isHover:false,
            isShift:false
        }
    ]

    const [nav,setNav] = useState(defaultNav)
    

    const handleHover = id => {
        const newNav = [...nav]
        newNav[id].isHover = true

        for(let i = id+1; i < newNav.length; i++){
            newNav[i].isShift= true
        }
        setNav(newNav)
    }
    const handleUnhover = id => {
        const newNav = [...nav]
        newNav[id].isHover = false

        for(let i = id+1; i < newNav.length; i++){
            newNav[i].isShift= false
        }
        setNav(newNav)
    }


    return(
        <div className="header">
            <div className="leftContainer">
                <div className="items">
                    {nav.map((navItem,id) => (
                        <div key={id} className={"itemWrapper " + (navItem.isHover && "hover")}>
                            <div className={"logoWrapper " + (navItem.isShift && "logoShift")}>
                                <Link to={navItem.link}> <img src={navItem.src} alt={navItem.alt} onMouseEnter={() => handleHover(id)} onMouseLeave={() => handleUnhover(id)} /> </Link>          
                            </div>
                            <div>
                                {navItem.isHover && 
                                    <div className="wordWrapper">
                                        <span className="animatedWord">{navItem.alt}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    ))}
                </div>
                <div className="fillerSpace">

                </div>
            </div>

            <div className="middleContainer">
            </div>

            <div className="rightContainer">
                <div className="logoWrapper">
                    <span>{stars}</span>
                    <img src={star} alt="Shop" />
                </div>
            </div> 
        </div>
    )
}