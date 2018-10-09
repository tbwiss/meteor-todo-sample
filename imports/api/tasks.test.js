import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
    describe('Task', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'Some text',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'timesaday'
                });
            });

            it('can delete own task', () => {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [taskId])
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}
