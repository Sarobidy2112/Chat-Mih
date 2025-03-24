import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});