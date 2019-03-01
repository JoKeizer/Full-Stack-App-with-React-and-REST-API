import React, {Component} from 'react';

class UserSignUp extends Component {
    submitForm(e){
        e.preventDefault();
        //TODO verify input, make sure passwords match
        this.props.signUp(e.target[0].value, e.target[1].value); //add the rest in aswell if verified
    }
    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form onSubmit={(e) => {this.submitForm(e)}}>
                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" /></div>
                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" /></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
                    <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                        defaultValue="" /></div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default UserSignUp