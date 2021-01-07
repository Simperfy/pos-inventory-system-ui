import axios from 'axios';
import env from 'react-dotenv';

export default class Api {
  static async getCurrentUser(jwt) {
    return axios.get(`${env.API_URL}/users/me`, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
  }

  static async getUsers() {
    return axios.get(`${env.API_URL}/users`);
  }

  static async getItems(jwt, params = {}) {
    const url = this.setParams(`${env.API_URL}/items`, params);

    return axios.get(url, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
  }

  // static async getItemsByNameOrId(jwt, query) {
  //   const url = `${env.API_URL}/items?_where[_or][0][item_name_contains]=${query}&_where[_or][1][id_in]=${query}`;
  //
  //   return axios.get(url, {
  //     headers: { Authorization: `Bearer ${jwt}` },
  //   });
  // }

  // static async getSuppliers(jwt) {
  //   return axios.get(`${env.API_URL}/suppliers`, {
  //     headers: { Authorization: `Bearer ${jwt}` },
  //   });
  // }

  static async create(jwt, url, params) {
    const baseURL = env.API_URL;

    return axios.post(baseURL + url, {...params}, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
  }

  static async createBatch(jwt, batchData) {
    const instance = axios.create({
      baseURL: env.API_URL,
      headers: {Authorization: `Bearer ${jwt}`},
    });

    const instances = [
      // instance.post(data.url, {...data.data})
    ];

    for (const data of batchData) {
      instances.push(instance.post(data.url, {...data.data}));
    }

    return axios.all([
      ...instances,
    ]);
  }

    static setParams = (url, params) => {
      url = new URL(url);
      // eslint-disable-next-line camelcase
      const search_params = url.searchParams;

      for (const key of Object.keys(params)) search_params.set(key, params[key]);

      url.search = search_params.toString();

      return url.toString();
    }
}
