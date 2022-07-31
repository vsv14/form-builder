import { Router } from "express";
import jsonRPCRouter from "./jsonRPCRouter.js";


const routes = Router();

routes.use('/json-rpc', jsonRPCRouter);


export default routes;