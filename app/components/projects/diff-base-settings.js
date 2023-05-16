import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  classes: null,

  isSaving: null,
  isSaveSuccessful: null,
  classNames: ['ProjectsDiffBaseSettings'],
  classNameBindings: [
    'classes',
  ],
  saveProject() {
    this.set('isSaving', true);
    this.set('isSaveSuccessful', null);
    this.get('project').save().then(() => {
      this.set('isSaving', false);
      this.set('isSaveSuccessful', true);
    }, () => {
      this.set('isSaving', false);
      this.set('isSaveSuccessful', false);
    });
  },
  actions: {
    setAutomatic() {
      this.set('project.diffBase', 'automatic');
      this.saveProject();
    },
    setManual() {
      this.set('project.diffBase', 'manual');
      this.saveProject();
    },
  },
});
