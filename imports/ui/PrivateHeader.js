import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => {
                Accounts.logout();
            }}>Log Out</button>
        </div>
    )
}

/*export default class PrivateHeader extends React.Component {
    onLogout() {
        Accounts.logout();
    }
    render() {

    }
}*/

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;