import app from './app-config.mjs';
import config from './configs/app-default.mjs'
import {dbConnect} from './mongoose-con.mjs';

const startServer = async () => {
    try {
        await dbConnect();
        return app.listen(config.port, () => console.log(`Listening to port ${config.port}`));
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}
startServer();