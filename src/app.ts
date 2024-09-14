import express from 'express'
import { envs } from './config/envs';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => 
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    }))
();

app.listen(envs.PORT, () => {
    console.log(`Server running on PORT ${envs.PORT}`);
    emailJob();
});