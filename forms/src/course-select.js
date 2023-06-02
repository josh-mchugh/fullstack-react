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
        onChange: PropTypes.func.isRequired
    };

    state = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    };

    static getDerivedStateFromProps = (update) => {
        return {
            department: update.department,
            course: update.course
        };
    };
}

export default CourseSelect;
