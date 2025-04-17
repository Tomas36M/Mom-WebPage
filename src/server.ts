import express, {Application} from "express";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";

const server: Application = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use('/uploads', express.static('uploads'));

server.use(router);

export default server;