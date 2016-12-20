import modalTemplate from './client.modal.html'
import modalInstanceCtrl from './client.modal.controller'

class ClientController {
  constructor($uibModal, ClientService) {
    this.name = 'client';
    this.client = [];
    this._Client = ClientService;
    this._uibModal = $uibModal;
  }

  $onInit() {
    console.log("initializing Client...");
    this.searchClients();
  }

  $onDestroy() {
    console.log("destroying Client...");
  }


  openDialog(id){
    let self = this;
    let modalInstance = this._uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: modalTemplate,
      controller: modalInstanceCtrl,
      controllerAs: '$ctrl',
      size: 'lg',
      resolve: {
        client: function () {
          return (id)?self._Client.get(id):undefined;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
        //$ctrl.selected = selectedItem;
    }, function () {

    });
  }

  search() {
    console.log("query client by keyword" + this.q);
  }

  searchClients() {
    let self = this;
    this._Client
      .query(this.q)
      .then(
      (res) => self.client = res
      );
  }
}

ClientController.$inject = ['$uibModal', 'ClientService'];
export default ClientController;
