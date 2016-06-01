import React from 'react';
import CaseList from './CaseList.jsx';

export default React.createClass({

    getInitialState: function () {
        return { cases: [] };
    },
    
    loadCases: function() {
        var url = 
            '/api/data/v8.0/incidents?' +
            '$filter=statecode eq 0' +
            '&$orderby=createdon desc' + 
            '&$top=10' + 
            '&$select=incidentid,title,createdon,ticketnumber';
            
        url = Xrm.Page.context.prependOrgName(url); 
        fetch(url, {
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(json => this.setState({cases: json.value}));
    },
    
    componentDidMount: function () {
        this.loadCases();
        this.timerId = window.setInterval(this.loadCases, 10000);
    },
    
    componentWillUnmount: function() {
        window.clearInterval(this.timerId);
    },
    
    render: function () {
        return (
            <CaseList cases={this.state.cases} />
        );
    }

});
