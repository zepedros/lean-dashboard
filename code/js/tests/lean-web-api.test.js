const frisby = require('frisby')
user = {
    username: "superuser",
    password: "Superuser123"
}
const Joi = frisby.Joi
const SERVER_URI = `http://localhost:8000/`;

test('Login: Test for status 200 & Content-Type', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        /*.then(async () => {
            await frisby.get(`${SERVER_URI}api/lean/projects`)
                .expect('status', 200)
        })*/
})