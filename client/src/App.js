import React, { Component } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Courses} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/courses/:id" render={({match}) => <CourseDetail id={match.params.id}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
