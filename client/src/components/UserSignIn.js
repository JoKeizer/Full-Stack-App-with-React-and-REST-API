import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class UserSignIn extends Component {
    submitForm(e){
        e.preventDefault();
        this.props.signIn(e.target[0].value, e.target[1].value);
        this.props.history.push('/');
    }
    render(){
        return(
            <div>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={(e) => {this.submitForm(e)}}>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary">Cancel</button></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <NavLink to="/signup">Click here</NavLink> to sign up!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignIn;