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

test('Get All Projects: for status code 200', async () => {
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

test('Get all Projects without login ', async () => {
            return frisby.fetch(`${SERVER_URI}api/lean/projects`, {
                method: 'GET',
            })
                .expect('status', 403)
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

/*test('Create Account', async () => {
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
                    "username" : "testUser4",
                    "password"  : "Testpassword123"
                })
            })
                .expect('status', 201)
        })
})*/
test('Create Account with a user that exists', async () => {
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
                    "username" : "superuser",
                    "password"  : "Superuser123"
                })
            })
                .expect('status', 409)
        })
})
test('Get project that doesnt exist ', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/projects/100`, {
                method: 'GET',
                headers: {
                    'cookie' : cookie
                }
            })
                .expect('status', 404)
        })
})

test('Get all users', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then(function(res) {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/users`, {
                method: 'GET',
                headers: {
                    'cookie' : cookie
                }
            })
                .expect('status', 200)
        })
})

test('Add user in a project', async () => {
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
                    return frisby.fetch(JSON.parse(res._body).message + '/users', {
                        method: 'POST',
                        headers: {
                            'cookie' : cookie
                        },
                        body: JSON.stringify({
                            'username' : 'testUser',
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

test('Delete user', async () => {
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
                    "username" : "user1234",
                    "password"  : "Testuser1234"
                })
            })
                .expect('status', 201)
                .then((res) => {
                    return frisby.fetch(`${SERVER_URI}api/lean/users/user1234`, {
                        method: 'DELETE',
                        headers: {
                            'cookie' : cookie
                        }
                    })
                        .expect('status', 200)
                })
        })
})

test('Delete user doesnt exists', async () => {
    return frisby.post(`${SERVER_URI}lean/login`, user)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json; charset=utf-8')
        .then((res) => {
            var cookie = res._response.headers.get('set-cookie').split(';')[0];
            return frisby.fetch(`${SERVER_URI}api/lean/users/123456`, {
                method: 'DELETE',
                headers: {
                    'cookie' : cookie
                }
            })
                .expect('status', 404)
        })
})

test('Get Credentials', async () => {
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
                    return frisby.fetch(JSON.parse(res._body).message + '/credentials', {
                        method: 'POST',
                        headers: {
                            'cookie' : cookie
                        },
                        body: JSON.stringify({
                            'name' : 'abc',
                            'source' : 'Jira',
                            'credential': {
                                'email': 'leandashboardproject@gmail.com',
                                'token': 'LPcyGdZolN906MvzdwPHF045',
                                'APIPath': 'leandashboard.atlassian.net',
                                'APIVersion': 3
                            }
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