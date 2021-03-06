class Promotion {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
  }

  query(keyword) {
    let deferred = this._$q.defer();
    let request = {
      url: this._AppConstants.api + '/promotions',
      method: 'GET',
      params: !!keyword ? { 'q': keyword } : null
    };
    this._$http(request)
      .then(
        (res) => deferred.resolve(res.data),
        (err) => deferred.reject(err)
      );
    return deferred.promise;
  }

  get(id) {
    let deferred = this._$q.defer();
    if (!id) {
      deferred.reject("promotion id is empty");
      return deferred.promise;
    }
    if (!id.toString().replace(" ", "")) {
      deferred.reject("promotion id is empty");
      return deferred.promise;
    }
    this._$http({
      url: this._AppConstants.api + '/promotions/' + id,
      method: 'GET'
    })
      .then(
      (res) => deferred.resolve(res.data),
      (err) => deferred.reject(err)
      );
    return deferred.promise;
  }

  getAllPromotiontypes(keyword) {
    let deferred = this._$q.defer();
    let request = {
      url: this._AppConstants.api + '/promotiontypes',
      method: 'GET',
      params: !!keyword ? { 'q': keyword } : null
    };
    this._$http(request)
      .then(
        (res) => deferred.resolve(res.data),
        (err) => deferred.reject(err)
      );
    return deferred.promise;
  }

  getByRentId(id) {
    let deferred = this._$q.defer();
    if (!id) {
      deferred.reject("rent id for promotion is empty");
      return deferred.promise;
    }
    if (!id.toString().replace(" ", "")) {
      deferred.reject("rent id for promotion is empty");
      return deferred.promise;
    }
    let request = {
      url: this._AppConstants.api + `/promotions/rent/${id}`,
      method: 'GET'
    };
    this._$http(request)
      .then(
        (res) => deferred.resolve(res.data),
        (err) => deferred.reject(err)
      );
    return deferred.promise;
  }

  save(promotion) {
    let request = {};
    if (promotion.promotionId) {
      request.url = `${this._AppConstants.api}/promotions/${promotion.promotionId}`;
      request.method = 'PUT';
      delete promotion.promotionId;
    } else {
      request.url = `${this._AppConstants.api}/promotions`;
      request.method = 'POST';
    }
    request.data = promotion;
    return this._$http(request);
  }

  remove(id) {
    let deferred = this._$q.defer();
    if (!id) {
      deferred.reject("promotion id is empty");
      return deferred.promise;
    }
    if (!id.toString().replace(" ", "")) {
      deferred.reject("promotion id is empty");
      return deferred.promise;
    }
    this._$http({
      url: this._AppConstants.api + '/promotions/' + id,
      method: 'DELETE'
    })
      .then(
      (res) => deferred.resolve(res.data),
      (err) => deferred.reject(err)
      );
    return deferred.promise;
  }

}

export default Promotion;
