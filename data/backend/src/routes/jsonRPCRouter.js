import { Router } from "express";
import jsonRPCServer from '../jsonRPCServer/index.js';


const jsonRPCRouter = Router();

jsonRPCRouter.post('/', (req, res)=>{
        const jsonRPCRequest = req.body;
        const userID = (jsonRPCRequest.id);
        jsonRPCServer.receive(jsonRPCRequest, { userID }).then((jsonRPCResponse) => {
            
            
            res.json(jsonRPCResponse);
          });

    }
);

export default jsonRPCRouter;