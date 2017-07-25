import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        // Tracker autorun fetch all links using find method
        // print links to console using console.log
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            let links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({
                links
            });
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        return this.state.links.map((link) => {

            const shortUrl = Meteor.absoluteUrl(link._id);

            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            // return <p key={link._id}>{link.url}</p>
        });
    }
    render() {
        return (
            <div>
                <p>Links List</p>
                <div>
                    {this.renderLinksListItems()}
                </div>
            </div>
        )
    }
}