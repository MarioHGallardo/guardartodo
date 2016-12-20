import template from './user.html';
import controller from './user.controller';
import './user.scss';

let userComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: '$ctrl'
};

export default userComponent;
