import React, { Component } from 'react';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  test = () => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(res => console.log(res));
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
