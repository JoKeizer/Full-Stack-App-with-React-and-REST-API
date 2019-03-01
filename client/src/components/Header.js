import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = ({user}) => {
    const checkUser = () => {
        if(user){
            console.log(user);
            return(
                <nav><span>Welcome {user.firstName} {user.lastName}!</span><NavLink className="signout" to="/">Sign Out</NavLink></nav>
            );
        }else{
            return(
                <nav><NavLink className="signup" to="/signup">Sign Up</NavLink><NavLink className="signin" to="/signin">Sign In</NavLink></nav>
            );
        }
    }

    return(
        //signed in
        
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                {checkUser()}
            </div>
            <hr />
        </div>
    );
}

export default Header;