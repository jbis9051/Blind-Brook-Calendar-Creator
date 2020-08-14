import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as path from "path";

const app: express.Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(__dirname + '/../node_modules/@bb-scheduler/frontend/build'));

app.all(['/', '/*'], ((req, res, next) => {
   res.sendFile(path.resolve(__dirname + '/../node_modules/@bb-scheduler/frontend/build/index.html'));
}));

export default app;

