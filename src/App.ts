import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import logger from "morgan";
import compression from "compression";
import {serverErrors} from "./middlewares/serverErrors";
import {apiRouter} from "./routes/api";
import {Sequelize} from 'sequelize-typescript';
import config from './config/config.json';
import multer from "multer";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads"); // here we specify the destination . in this case i specified the current directory
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);// here we specify the file saving name . in this case i specified the original file name
    }
});
const upload = multer({storage});
export default class App {
    private app = express();
    private db;
    public publicMiddleware(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(upload.any());
        this.app.use(express.static(path.join(__dirname, 'public')));
        if (process.env.APP_ENV === "production") {
            this.app.use(compression());
        }else{
            this.app.use(logger('dev'));
        }
        this.app.use(serverErrors);
    }
    private database(){
        const conf = config[process.env.NODE_ENV || 'development'];
        this.db =  new Sequelize({
            database: conf.database,
            host: conf.host,
            username: conf.username,
            password: conf.password,
            dialect: conf.dialect,
            models: [__dirname + '/models/*.ts'],
        });
    }
    private routes(){
        this.app.use('/api', apiRouter);
    }
    public run(){
        this.database();
        this.publicMiddleware();
        this.routes();
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port,() => console.log(`listening on port ${port}!`));
    }
}
