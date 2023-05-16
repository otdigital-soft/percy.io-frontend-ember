import moment from 'moment';

export default function(server) {
  server.logging = true;

  let user = server.create('user', {_currentLoginInTest: true});
  let subscription = server.create('subscription', {billingEmail: 'foo@bar.com'});
  let organization = server.create('organization', {subscription});
  server.create('organizationUser', {user, organization, role: 'admin'});

  let project = server.create('project', {organization});
  let build = server.create('build', {project, createdAt: moment().subtract(2, 'minutes') });
  server.create('comparison', {build});
  server.create('comparison', 'wasAdded', {build});
  server.create('comparison', 'wasRemoved', {build});
  server.create('comparison', 'same', {build});
}
