import angular from 'angular';
import uiRouter from 'angular-ui-router';
import rentviewerComponent from './rentviewer.component';

let rentviewerModule = angular.module('app.component.rentviewer', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('rentviewer', {
      url: '/rentviewer',
      component: 'rentviewer',
      data: {
        requiresAuth: true
      }
    });
})
.component('rentviewer', rentviewerComponent)

.name;

export default rentviewerModule;