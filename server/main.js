import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // code to run on server at startup
    WebApp.connectHandlers.use((req, res, next) => {
        // console.log(req.url, req.method, req.headers, req.query);

        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });

        if (link) {
            // Set HTTP status code to a 302
            res.statusCode = 302;
            // Set 'Location' header to link
            res.setHeader('Location', link.url);
            // End HTTP request
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }

    });
});
