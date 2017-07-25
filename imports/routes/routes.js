import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links');
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const IsAuthenticatedPage = authenticatedPages.includes(pathname);

    if (IsUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if (IsAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound}/>
    </Router>
);