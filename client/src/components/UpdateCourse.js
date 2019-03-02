import React,{Component} from 'react';

class UpdateCourse extends Component {

    state = {
        course: {
            title: null,
            description: '',
            estimatedTime: null,
            materialsNeeded: '',
            user: {
                firstName: null,
                lastName: null
            }
        }
    }
    
    handleDescChange(e){
        this.setState({
            course:{...this.state.course, description:e.target.value}
        })
    }
    
    handleMatsChange(e){
        this.setState({
            course:{...this.state.course, materialsNeeded:e.target.value}
        })
    }

    cancel(e){
        e.preventDefault();
        this.props.history.push(`/courses/${this.props.id}`);
    }

    componentDidMount(){
        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
            .then(res => {
                res.json()
                    .then(course =>{
                        if(res.status === 200)
                        this.setState({course})
                    })
            })
    }

    render(){
        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                <form>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                            defaultValue={this.state.course.title} /></div>
                        <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={(e) => this.handleDescChange(e)} value={this.state.course.description}/></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                placeholder="Hours" defaultValue={this.state.course.estimatedTime} /></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={(e) => this.handleMatsChange(e)} value={this.state.course.materialsNeeded}/></div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={(e) => this.cancel(e)}>Cancel</button>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default UpdateCourse;