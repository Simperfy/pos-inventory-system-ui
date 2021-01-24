import Api from '../Api';

export default class ModelTransactionItem {
  static async createBatch(jwt, transactionId, pendingSalesItems) {
    const batchData = [
      // {url: '/transaction-items', data: {}}
    ];

    for (const pi of pendingSalesItems) {
      batchData.push({
        url: '/transaction-items',
        data: {
          'quantity': pi.quantity,
          'discount': pi.discount,
          'subtotal': (pi.price - pi.discount) * pi.quantity,
          'item': pi.barcode,
          'price': pi.price,
          'transaction': transactionId,
        },
      });
    }

    return Api.createBatch(jwt, batchData);
  }
}
