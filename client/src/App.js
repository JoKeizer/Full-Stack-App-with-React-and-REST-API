import React, { Component } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut'; 
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  state = {
    user: null
  }

  signOut(){
    this.setState({
      user: null
    });
  }

  signUp(firstName, lastName, email, password){

  }

  signIn(email, password){
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'));
    fetch('http://localhost:5000/api/users', {
      method: "GET",
      headers: headers
    })
    .then(res =>{
      if(res.status === 200){
        res.json()
          .then(res =>
            this.setState({
              user :
              {
                firstName: res.firstName,
                lastName: res.lastName,
                headers: headers
              }
            })
          );
      }else{
        //handle unauthorized error
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user}/>
          <Route exact path="/" component={Courses} />
          <Route path="/signin" render={({history}) => <UserSignIn history={history} signIn={this.signIn.bind(this)} />} />
          <Route path="/signup" render={() => <UserSignUp signUp={this.signUp.bind(this)} />} />
          <Route path="/signout" render={() => <UserSignOut signOut={this.signOut.bind(this)} />} />
          <Route path="/courses/:id/update" render={() => <UpdateCourse />} />
          <Switch>
            <Route path="/courses/create" render={() => <CreateCourse />} />
            <Route exact path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
