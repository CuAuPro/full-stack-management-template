/**
 * Module dependencies.
 */
import * as path from "path"

import Express, { Request, Response } from 'express';
//import * as http from "http";
import * as https from "https";

import * as fs from "fs";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { AppContext } from "./app-context.js";

import YAML from 'yamljs';
import { basePath, __dirname, __filename } from './base-path.js';


import swaggerUi from 'swagger-ui-express';
import authMiddleware from "./middleware/authMiddleware.js";

import AuthRoutes from './routes/authRoutes.js';
import ApiRoutes from './routes/apiRoutes.js';

export default class App {
  private expressApplication: Express.Application;
  private authRoutes: any;
  private apiRoutes: any;
  public server;
  private port;

  constructor(appContext: AppContext, port: number) {
    this.port = port;
    this.authRoutes = new AuthRoutes();
    this.apiRoutes = new ApiRoutes();
    this.expressApplication = Express();
    //this.server = http.createServer(this.expressApplication);

    const options = {
      key: fs.readFileSync(path.resolve(__dirname, '../certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../certs/cert.pem'))
    };

    this.server = https.createServer(options, this.expressApplication);

    const swaggerDocument = YAML.load(path.join(__dirname, './routes/swagger.yaml'));

    this.expressApplication.use(
      session({
        secret: "CHANGEME",
        resave: false,
        saveUninitialized: true,
      })
    );

    // Add context
    this.expressApplication.use((req: Request, res: Response, next) => {
      req.appContext = appContext;
      next();
    });

    // Use the cors middleware
    this.expressApplication.use(cors({
      origin: [
        "http://localhost:4200"
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  }));

    // Body parser (req.body)
    this.expressApplication.use(Express.json());
    this.expressApplication.use(Express.urlencoded({ extended: false }));

    // Add cookie parser
    this.expressApplication.use(cookieParser());

    // Static / public folder
    const publicHome =
      process.env.PUBLIC_HOME === null || process.env.PUBLIC_HOME === undefined
        ? "public"
        : process.env.PUBLIC_HOME;
    this.expressApplication.use(
      Express.static(path.join(__dirname, publicHome))
    );

    // Map routes
    //this.expressApplication.use("/api", this.api.router);

    this.expressApplication.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.expressApplication.use('/auth', this.authRoutes.router);

    // Apply authentication middleware to /api routes
    this.expressApplication.use('/api', authMiddleware);
    this.expressApplication.use('/api', this.apiRoutes.router);

    this.expressApplication.use(Express.static(path.join(__dirname, '../../frontend/dist/frontend/browser')));

    this.expressApplication.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/dist/frontend/browser/index.html'));
    });

  }

  public async start() {
    // Listen on provided port, on all network interfaces.
    this.server.listen(this.port);
    this.server.on("error", (error: { syscall: string; code: any }) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind =
        typeof this.port === "string"
          ? `Pipe ${this.port}`
          : `Port ${this.port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
    this.server.on("listening", () => {
      App.bind(this);
      const addr = this.server.address();
      const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
      //console.log(`Listening on ${bind}`);
      console.log(`Server is running on https://localhost:${this.port}`);
    });
  }

}
