import Express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();
const PORT = parseInt(process.env.PORT, 10) || 4000;


const app = Express();



app.use(Express.static(path.join(__dirname, '../public/build')))

app.get('/*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/build', 'index.html'))
})




const start = async ()=>{
    try {
        app.listen( PORT, '0.0.0.0', () => console.log(`App listening PORT: ${PORT}`));
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}


start();