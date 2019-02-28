import React,{Component} from 'react';
import CourseButton from './CourseButton';
class Courses extends Component {

    state = {
        courses: []
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(courses => this.setState({courses}));
    }

    generateCourses(){
        return(
            this.state.courses.map((course,i) => {
                return(
                    <CourseButton key={i} course={course}/>
                );
            })
        );
    }



    render(){
        return(
            <div>
                <div className="header">
                    <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
                    </div>
                </div>
                <hr />
                <div className="bounds">

                    {this.generateCourses()}
                    
                    <div className="grid-33">
                        <a className="course--module course--add--module" href="/courses/create">
                            <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course</h3>
                        </a>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Courses;