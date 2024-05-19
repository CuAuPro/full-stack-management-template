import Express from 'express';
import { healthcheck, getUsers, getProducts } from '../controllers/apiController.js';

export default class ApiRoutes {
  public router: Express.Router;
  //private upload: multer.Multer;

  constructor() {

    //this.upload = multer({ storage: storage });

    this.router = Express.Router();
    this.router.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        console.log("/api, Time: ", Date.now());
        next();
      }
    );


    this.router.get('/healthcheck', healthcheck);

    this.router.get('/users', getUsers);
    this.router.get('/products', getProducts);



  }
}

