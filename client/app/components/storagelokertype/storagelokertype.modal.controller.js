export default class InstanceCtrl {
  constructor($uibModalInstance, $log, $filter, $scope, storagelokertype) {
    "ngInject";

    this._uibModalInstance = $uibModalInstance;
    this._log = $log;
    this._scope = $scope;
    this._storagelokertype = storagelokertype;

    this._title = (storagelokertype)?'Editar tipo de bodega':'Nuevo tipo de bodega';
    this._data = { storagelokertypeId:null, name:'', description: '', price: 0.00, size: '' };
  }

  $onInit() {
    if (this._storagelokertype) {
      this._data = this._storagelokertype[0];
      delete this._data.enable;
      delete this._data.createDatetime;
    }
  }

  save() {
    this._uibModalInstance.close(this._data);
  };

  cancel() {
    this._uibModalInstance.dismiss(undefined, 'Cancel');
  };

  validate() {
    angular.forEach(this._scope.styForm, function(value, key) {
         if (typeof value === 'object' && value.hasOwnProperty('$modelValue'))
             value.$setDirty();
     });
    return true;
  }

}
