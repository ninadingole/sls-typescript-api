import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import HomeController from './controller/home.controller';
import BaseController from './core/base.interface';


export default class App {
    public express: express.Application;

    constructor(controllers: BaseController[]) {
        this.express = express();
        this.express.set('port', process.env.PORT || 3000);
        this.initializeMiddlewares();
        this.initializeRoutes(controllers);
        console.log('Initialized done');
    }

    start(): void {
        this.express.listen(this.express.get('port'), () => {
            console.log('App is running at http://localhost:%d in %s mode', this.express.get('port'));
            console.log('  Press CTRL-C to stop\n');
        });
    }

    private initializeMiddlewares() {
        this.express.use(compression());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeRoutes(controllers: BaseController[]) {
        controllers.forEach(controller => {
            this.express.use('/', controller.routes());
        });
    }


}

const app = new App([new HomeController()]);

export { app };