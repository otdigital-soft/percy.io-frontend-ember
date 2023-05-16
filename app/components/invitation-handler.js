import Ember from 'ember';

export default Ember.Component.extend({
  invitation: null,

  classNames: ['InvitationHandler'],
  session: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  actions: {
    invalidateSession() {
      this.sendAction('invalidateSession');
    },
    accept() {
      // Invitations are accepted with a PATCH request against the invite endpoint.
      this.get('invitation').save().then((model) => {
        this.sendAction('inviteAccepted', model);
      }, () => {
        alert(
          'Something went wrong! You might already be in this organization. ' +
          'Feel free to reach out to hello@percy.io for help.'
        );
      });
    },
  },
});
