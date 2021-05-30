import axios from 'axios';

export class Service {
  api = axios.create({
    baseURL: 'http://localhost:4000/',
  });
}
