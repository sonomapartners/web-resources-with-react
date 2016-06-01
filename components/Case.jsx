import React from 'react';

export default React.createClass({
    render: function() {
        var url = Xrm.Page.context.prependOrgName(
            '/main.aspx?pagetype=entityrecord&etn=incident&id=' + 
            this.props.incident.incidentid);
            
        return (
            <li>
                <p><a href={url} target='_blank'>{ this.props.incident.title }</a></p>
                <p>Ticket #:{ this.props.incident.ticketnumber }</p>
                <p>Opened On { this.props.incident.createdon }</p>
            </li>
        );
    }
});
