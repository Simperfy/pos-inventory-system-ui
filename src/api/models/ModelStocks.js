import Api from '../Api';

export default class ModelStocks {
  static async getRemaining(jwt, itemNameQuery) {
    const params = {
      search: itemNameQuery,
    };

    return Api.get(jwt, '/items/remaining', params);
  }

  static async createBatch(jwt, userId, pendingItems) {
    const batchData = [
      // {url: '/stocks', data: {}}
    ];

    for (const pi of pendingItems) {
      batchData.push({
        url: '/stocks',
        data: {
          // 'kilo': pi.kilo <= 0 ? null : pi.kilo,
          'kilo': null,
          'stock_quantity': pi.quantity,
          'item': pi.barcode,
          'supplier': pi.supplierId,
          'users_permissions_user': userId,
        },
      });
    }

    return Api.createBatch(jwt, batchData);
  }
}
