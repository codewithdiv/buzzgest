import '../../../scrapper/article/PunchArticleScrapper';
// import '../../../scrapper/article/TechCrunchArticleScrapper';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from 'config';
import enforce from 'express-sslify';
import userRouter from './router/user.route';
import ErrorHandler from './middlewares/error_handler.middleware';
import AppException from '../../../exceptions/AppException';
import morgan from 'morgan';
import categoryRouter from './router/category.router';
import articleRouter from './router/article.route';

const app: Application = express();

if (config.get<string>('env') === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

if (config.get<string>('env') === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/article/', articleRouter);
app.use('/api/v1/category/', categoryRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppException(`Cant find ${req.originalUrl} on the server.`, 404)
  );
});
app.use(ErrorHandler);
export default app;

// class App {
//   public app: Application;
//   public port: number;

//   constructor() {
//     this.app = express();
//     this.port = config.get<number>('port');
//   };
// }
