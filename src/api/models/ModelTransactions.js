import Api from '../Api';

export class ModelTransactions {
  static async create(jwt, id) {
    const url = '/transactions';
    const params = {
      'subtotal': 0,
      'users_permissions_user': id,
    };

    return Api.create(jwt, url, params);
  }
}
