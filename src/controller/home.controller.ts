import express, { Router, Request, Response } from 'express';
import BaseController from '../core/base.interface';


export default class HomeController implements BaseController {

    path: string = '/home';

    expRouter: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.expRouter.get(this.path, this.helloWorld);
        this.expRouter.post(this.path, this.save);
    }

    helloWorld(_: Request, res: Response): void {
        res.json('Hello World');
    }

    save(req: Request, res: Response): void {
        const person = req.body;
        res.send(person);
    }

    routes(): Router {
        return this.expRouter;
    }
}