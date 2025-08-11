
import bookIcon from "../assets/book-icon.png"
import coffeeCupIcon from "../assets/cup-coffee-icon.png"
import aiIcon from "../assets/ai-icon.png"

import "./Header.css"


export default function Header() {
    return (
        <header>
            <div className= "header-icons">
                <div className="background-icon soft-green">
                    <img src={coffeeCupIcon} className= "icon" alt="cup of coffee icon" />
                </div>
                <div className="background-icon light-nude">
                    <img src={bookIcon} className= "icon" alt="book icon" />
                </div>
                <div className="background-icon soft-green">
                    <img src={aiIcon} className= "icon" alt="ai icon" />
                </div>
            </div>
            <h2>Cozy Book AI</h2>
            <p>
                Discover your next great read! Tell our AI what kind of book you're in the mood for,<br /> 
               and we'll brew up some perfect recommendations just for you.
            </p>

        </header>
    )
}