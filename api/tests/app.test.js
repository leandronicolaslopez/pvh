const request = require('supertest');
const app = require('./../app');

const nonExistingUser = {
    id: -999,
    name: "Brian"
}

const unnamedUser = {
    id: 1
}

describe('Test the root path', () => {
    test('Call to get users return 200', () => {
        return request(app).get('/api/users').expect(200)
    }),
        test('Update user with no name returns 400', () => {
            return request(app)
                .put('/api/users')
                .send(unnamedUser)
                .expect(400)
        }),
        test('Update non-existing user returns 404', () => {
            return request(app)
                .put('/api/users')
                .send(nonExistingUser)
                .expect(404)
        })
});