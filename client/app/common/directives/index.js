import angular from 'angular';
import ShowAuthed from './show-authed.directive';
import Currency from './currency.directive';
import ConfirmDialog from './confirm-dialog.directive';
import ModalConfirmCtrl from './confirm-dialog.controller';
import DashboardBack from './dashboard-back.directive';

import PaymentDialog from './payment-dialog.directive';
import ModalPaymentCtrl from './payment-dialog.controller';

let directivesModule = angular.module('app.common.directives', [])

.directive('showAuthed', ShowAuthed)
.directive('currency', Currency)
.directive('ngConfirm', ConfirmDialog)
.directive('ngPayment', PaymentDialog)
.directive('dashboardBack', DashboardBack)
.controller('modalPaymentCtrl', ModalPaymentCtrl)
.controller('modalConfirmCtrl', ModalConfirmCtrl)
.name;

export default directivesModule;
