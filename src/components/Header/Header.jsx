import React from 'react'
import logo from "../../images/netflixlogo.png"
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
const Header = () => {
    return (
        <nav className="header">

            <img src={logo} alt="" />
            <div>
                <Link to="/TvShows" >TV Show</Link>
                <Link to="/Movies" >Movies</Link>
                <Link to="/views" >Recently View</Link>
                <Link to="/list" >Lists</Link>
            </div>
            <CiSearch />
        </nav>
    )
}

export default Header