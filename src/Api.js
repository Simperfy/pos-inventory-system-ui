import axios from 'axios';
import env from 'react-dotenv';

export default class Api {
  static async getCurrentUser(jwt) {
    return axios.get(`${env.API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  }

  static async getUsers() {
    return axios.get(`${env.API_URL}/users`);
  }

  static async getItems(jwt, params = {}) {
    const url = this.setParams(`${env.API_URL}/items`, params)

    return axios.get(url, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  }

  static setParams = (url, params) => {
    url = new URL(url);
    const search_params = url.searchParams;

    for (const key of Object.keys(params)) search_params.set(key, params[key]);

    url.search = search_params.toString();

    return url.toString();
  }
}
