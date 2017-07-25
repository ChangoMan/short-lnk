import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { Links } from '../api/links';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
    return (
        <div>
            <PrivateHeader title="Your Links" />
            <LinksListFilters />
            <AddLink />
            <LinksList />
        </div>
    )
}