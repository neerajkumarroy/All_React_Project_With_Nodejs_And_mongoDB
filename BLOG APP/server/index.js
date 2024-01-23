import express from 'express';
import connection from './Database/db.js';
import Router from './Routes/route.js'
import cors from 'cors';
const PORT = 6000;
const app = express();

app.use(cors());
app.use('/', Router);



app.listen(PORT, () => console.log(`App is running on Port Number ${PORT}`));
connection();

