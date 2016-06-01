import React from 'react';
import Case from './Case.jsx';

export default React.createClass({
    render: function () {
        return (
            <ul>
                { this.props.cases.map(c => <Case key={c.incidentid} incident={c} />) }
            </ul>
        );
    }
});
