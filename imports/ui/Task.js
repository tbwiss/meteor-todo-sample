import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export class Task extends Component {
    togglePrivate() {
        const { _id, isPrivate } = this.props.task;
        Meteor.call('tasks.setPrivate', _id, !isPrivate);
    }

    toggleChecked() {
        const { _id, checked } = this.props.task;
        Meteor.call('tasks.setChecked', _id, !checked);
    }

    deleteThisTask () {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    render () {
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private
        });

        return (
            <li className={taskClassName}>
                <button className="button" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                {this.props.showPrivateButton &&
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        {this.props.task.isPrivate ? 'Private' : 'Public '}
                    </button>
                }

                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
        );
    }
}
