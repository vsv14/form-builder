import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const mongoDB = process.env.MONGODB

const app = Express();


app.use(cors());
app.use(Express.static(path.join(__dirname, '../public/build')))
app.use(Express.json());
app.use(routes);



app.get('/*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/build', 'index.html'))
})


const start = async ()=>{
    try {
        await mongoose.connect(
            mongoDB
        ).then((res)=>console.log('MongoDB connected'))
        .catch(e=>console.log(e));

        app.listen( PORT, '0.0.0.0', () => console.log(`App listening PORT: ${PORT}`));
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}


start();