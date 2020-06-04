import express from 'express';
import routes from './routes';


class App{
  constructor(){
    server = express();

    middleweres();
    routes();
  }

  middleweres(){
   server.use(express.json());
  }

  routes(){
   server.use(routes);
  }
}

export default new App().server;