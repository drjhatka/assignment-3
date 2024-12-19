import express, { Application } from "express";
import { configureServer } from "./app/server/server.config";
import router from "./app/routes/router";
import { GlobalErrorHandler } from "./app/error/globalErrorHandler";

const app:Application = express();       //create express app

configureServer(app);                    //configure express app

app.use('/api', router);              //use the router array

app.use(GlobalErrorHandler)

export default app;