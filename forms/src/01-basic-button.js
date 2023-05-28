import React from 'react';

const content = document.createElement('div');
document.body.append(content);

class Button extends React.Component {
    static displayName = '01-basic-button';

    render() {
        return (
            <div>Hello World</div>
        );
    }
};

export default Button;
