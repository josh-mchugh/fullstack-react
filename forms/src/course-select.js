import PropTypes from 'prop-types';
import React from 'react';
import Core from './api/core.json';
import Electives from './api/electives.json';

const Courses = {
    core: Core,
    electives: Electives
};

class CourseSelect extends React.Component {
    static propTypes = {
        department: PropTypes.string,
        course: PropTypes.string,
        onChanges: PropTypes.func.isRequired
    };

    state = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    };

    static getDerivedStateFromProps = function(update) {
        return {
            department: update.department,
            course: update.course
        };
    };

    onSelectDepartment = (evt) => {
        const department = evt.target.value;
        const course = null;
        this.setState((prevState, props) => ({ department, course }));
        this.props.onChanges([
            {
                name: 'department',
                value: department
            },
            {
                name: 'course',
                value: course
            }
        ]);

        if(department) {
            this.fetch(department);
        }
    };

    onSelectCourse = (evt) => {
        const course = evt.target.value;
        this.setState((prevState, props) => ({ course }));
        this.props.onChanges([{
            name: 'course',
            value: course
        }]);
    };

    fetch = department => {
        this.setState((prevState, props) => ({
            _loading: true,
            courses: []
        }));
        apiClient(department).then(courses => {
            this.setState((prevState, props) => ({
                _loading: false,
                courses: courses
            }));
        });
    };

    renderDepartmentSelect = () => {
        return (
            <select
              onChange={this.onSelectDepartment}
              value={this.state.department || ''}
            >
              <option value="">Which Department?</option>
              <option value="core">NodeSchool: Core</option>
              <option value="electives">NodeSchool: Electives</option>
            </select>
        );
    };

    renderCourseSelect = () => {
        if(this.state._loading) {
            return <div>Loading...</div>
        }

        if(!this.state.department || !this.state.courses.length) {
            return <span />
        }

        return (
            <select onChange={this.onSelectCourse} value={this.state.course || ''}>
              {[
                <option value="" key="course-none">Which course?</option>,
                ...this.state.courses.map((course, i) => (
                  <option value={course} key={i}>
                    {course}
                  </option>
                ))
              ]}
            </select>
        );
    };

    render() {
        return (
            <div>
              {this.renderDepartmentSelect()}
              <br/>
              {this.renderCourseSelect()}
            </div>
        );
    }
};

function apiClient(department) {
    return {
        then: function(cb) {
            setTimeout(() => {
                cb(Courses[department]);
            }, 1000);
        }
    };
}

export default CourseSelect;
