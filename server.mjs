import express from 'express';
import config from './configs/app-default.mjs'
let app = express();

app.use(express.json());
app.listen(config.port, () => console.log(`Listening to port ${config.port}`));