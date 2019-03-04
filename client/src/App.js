import React, { Component } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut'; 
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  state = {
    user: null
  }

  componentDidMount(){
    if(JSON.parse(localStorage.getItem('user'))){
      this.setState({
        user: { 
          ...JSON.parse(localStorage.getItem('user')),
          headers: JSON.parse(localStorage.getItem('headers'))
        }
      });
    }
  }
  
  signOut(){
    this.setState({
      user: null
    }, () => {
      localStorage.setItem('user',null);
      localStorage.setItem('headers',null);
    });
  }

  signUp(firstName, lastName, email, password){
    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: password
    });

    return fetch('http://localhost:5000/api/users', {
      method: "POST",
      body: data,
      headers:{
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(res.status === 201){
          this.signIn(email,password);
        }else{
          return res.json()
        }
      });
  }

  signIn(email, password){
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'));
    headers.append('Content-Type', 'application/json')
    return fetch('http://localhost:5000/api/users', {
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
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName,
                headers: headers
              }
            }, () => {
              localStorage.setItem('user', JSON.stringify(this.state.user));
              let storedHeaders = [];
              storedHeaders.push(["authorization", headers.get('Authorization')]);
              storedHeaders.push(["content-type", headers.get('Content-Type')]);
              localStorage.setItem('headers', JSON.stringify(storedHeaders));
            })
          );
          return(200);
      }else{
        return(422);
      }
    });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user}/>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/signin" render={({history}) => <UserSignIn history={history} signIn={this.signIn.bind(this)} />} />
            <Route path="/signup" render={({history}) => <UserSignUp history={history} signUp={this.signUp.bind(this)} />} />
            <Route path="/signout" render={() => <UserSignOut signOut={this.signOut.bind(this)} />} />
            <PrivateRoute path="/courses/:id/update" user={this.state.user} component={({match, history}) => <UpdateCourse history={history} user={this.state.user} id={match.params.id}/>} />
            <PrivateRoute path="/courses/create" user={this.state.user} component={CreateCourse}/>} />
            <Route exact path="/courses/:id" render={({match, history}) => <CourseDetail history={history} user={this.state.user} id={match.params.id}/>} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
