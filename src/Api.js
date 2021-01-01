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

  static async getItems(jwt) {
    return axios.get(`${env.API_URL}/items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  }
}
