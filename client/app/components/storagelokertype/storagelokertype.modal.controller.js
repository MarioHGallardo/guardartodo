export default class InstanceCtrl {
  constructor($uibModalInstance, $log, $filter, storagelokertype) {
    this._uibModalInstance = $uibModalInstance;
    this._log = $log;
    this._storagelokertype = storagelokertype;

    this._title = (storagelokertype)?'Editar tipo de bodega':'Nuevo tipo de bodega';
    this._data = { storagelokertypeId:null, name:'', description: '', price: 0.00, size: '' };
  }

  save() {
    this._uibModalInstance.close(this._data);
  };

  cancel() {
    this._uibModalInstance.dismiss(undefined, 'Cancel');
  };

}

InstanceCtrl.$inject = ['$uibModalInstance', '$log', '$filter', 'storagelokertype'];