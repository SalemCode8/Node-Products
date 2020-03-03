import App from "./App";
import Dotenv from 'dotenv';
import * as path from "path";
Dotenv.config({
    path: path.join(__dirname, '..', '.env')
});
const app = new App();

app.run();
