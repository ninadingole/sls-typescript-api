import App from '../src/app';
import request from 'supertest';
import HomeController from '../src/controller/home.controller';

describe('hello world', () => {

    const agent = request(new App([new HomeController()]).express);

    test('should return hello world on /home GET', (done) => {
        agent
            .get('/home')
            .expect(200)
            .then(res => {
                expect(res.body).toBeTruthy();
                expect(res.body).toBe('Hello World');
                done();
            });
    });

    test('should post data using POST /home ', (done) => {
        agent
            .post('/home')
            .set('Accept', 'application/json')
            .send(`{ "name": "Neenad Ingole", "favoritePlace": "Himachal" }`)
            .expect(200, done);
    });
});