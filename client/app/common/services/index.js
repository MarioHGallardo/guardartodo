import ClientService from './client.service';
import DashboardService from './dashboard.service';
import SigninService from './signin.service';
import SignupService from './signup.service';
import StoragelokerService from './storageloker.service';
import StoragelokertypeService from './storagelokertype.service';
import UserService from './user.service';
import RentService from './rent.service';
import Auth from './Auth';
import JWT from './JWT';
import Print from './Print';
import Company from './Company';
//...
let commonServicesModule = angular.module('app.common.services', [])
  .service('JWT', JWT)
  .service('Auth', Auth)
  .service('Print', Print)
  .service('Company', Company)
  .service('ClientService', ClientService)
  .service('DashboardService', DashboardService)
  .service('SigninService', SigninService)
  .service('SignupService', SignupService)
  .service('StoragelokerService', StoragelokerService)
  .service('StoragelokertypeService', StoragelokertypeService)
  .service('UserService', UserService)
  .service('RentService', RentService)
.name;

export default commonServicesModule;
