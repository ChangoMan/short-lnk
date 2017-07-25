import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

// visitedCount: 0
// lastVisitedAt: null

export default class AddLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit(event) {
        const url = this.state.url;
        event.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({
                    error: err.reason
                });
            }
        });

        /*
        // This no longer works because the "insecure" package is uninstalled
        Links.insert({
            url,
            userId: Meteor.userId()
        });
        */

    }

    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        });
    }

    handleModalClose() {
        this.setState({
            isOpen: false,
            url: '',
            error: ''
        });
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        isOpen: true
                    });
                }}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => {
                        this.refs.url.focus()
                    }}
                    onRequestClose={this.handleModalClose.bind(this)}>
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input type="text" placeholder="URL" ref="url" value={this.state.url} onChange={this.onChange.bind(this)} />
                        <button>Add Link</button>
                    </form>
                    <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </Modal>
            </div>
        )
    }
}