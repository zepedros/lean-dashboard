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
})

test('Get All Projects', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/projects`, {
                method: 'GET',
                headers: {
                    'cookie' : cookie
                }
            })
                .expect('status', 200)
        })
})

test('Post Project', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/projects`, {
                method: 'POST',
                headers: {
                    'cookie' : cookie
                },
                body: JSON.stringify({
                    'name' : 'Test Project',
                    'description': 'this is a test',
                    "startDate" : "06-23-2021",
                    "endDate" : "06-20-2031"
                })
            })
                .expect('status', 201)
                .then((res) => {
                    return frisby.fetch(JSON.parse(res._body).message, {
                        method: 'GET',
                        headers: {
                            'cookie' : cookie
                        }
                    })
                        .expect('status', 200)
                })
        })
})

test('Post Dashboard', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/projects`, {
                method: 'POST',
                headers: {
                    'cookie' : cookie
                },
                body: JSON.stringify({
                    'name' : 'Test Project',
                    'description': 'this is a test',
                    "startDate" : "06-23-2021",
                    "endDate" : "06-20-2031"
                })
            })
                .expect('status', 201)
                .then((res) => {
                    return frisby.fetch(JSON.parse(res._body).message + '/dashboard', {
                        method: 'POST',
                        headers: {
                            'cookie' : cookie
                        },
                        body: JSON.stringify({
                            'name' : 'Test dashboard',
                            'description' : 'test dashboard'
                        })
                    })
                        .expect('status', 201)
                        .then((res)=>{
                            return frisby.fetch(JSON.parse(res._body).message, {
                                method: 'GET',
                                headers: {
                                    'cookie' : cookie
                                }
                            })
                                .expect('status', 200)
                        })
                })
        })
})

test('Get widget Templates', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/projects/widgets/templates`, {
                method: 'GET',
                headers: {
                    'cookie' : cookie
                }
            })
                .expect('status', 200)
        })
})

test('Create Account', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}lean/register`, {
                method: 'POST',
                headers: {
                    'cookie' : cookie
                },
                body: JSON.stringify({
                    "username" : "testUser",
                    "password"  : "Testpassword123"
                })
            })
                .expect('status', 201)
        })
})