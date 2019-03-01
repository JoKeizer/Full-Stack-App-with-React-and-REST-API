import React,{Component} from 'react';

class CourseDetail extends Component {

    state = {
        course: {title:null,description:null,estimatedTime:null,materialsNeeded:null}
    }

    componentDidMount(){
        console.log(this.props.id);
        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
            .then(res => {
                res.json()
                    .then(course =>{
                        if(res.status === 200)
                        this.setState({course})
                    })
            })
    }

    populateMaterials(){
        if(this.state.course.materialsNeeded!==null){
            let materials = this.state.course.materialsNeeded.split('* ');
            materials.shift();
            return(materials.map(material => <li>{material}</li>))
        }
    }

    render(){
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                            className="button button-secondary" href="/courses">Return to List</a></div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.course.title}</h3>
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <p>{this.state.course.description}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.populateMaterials()}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CourseDetail;