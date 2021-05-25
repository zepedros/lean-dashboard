const passport = require('passport');
const session = require('express-session');
const fetcher = require('./uri-fetcher')
const FileStore = require('session-file-store')(session);

const error = require('./error')
const response = require('./responses')

/*
const config = {
    host: 'localhost',
    port: 9200,
    index: "lean-users"
}
const baseURL = `http://${config.host}:${config.port}/${config.index}/`


function userToRef(user, done) {
    done(null, user.username);
}

async function refToUser(userRef, done) {
    const uri = `${baseURL}_doc/${userRef}`
    const user = (await fetcher.makeGetRequest(uri))._source;
    if (user) {
        done(null, user);
    } else {
        done('User unknown');
    }
}*/

function makeAuth(authization) {
    return {

        /*
        initialize: app => {
            app.use(session({
                resave: false,
                saveUninitialized: false,
                secret: 'leandashboard',
                store: new FileStore()
            }));

            app.use(passport.initialize());
            app.use(passport.session());

            passport.serializeUser(userToRef);
            passport.deserializeUser(refToUser);
        },

        checkUser: async function(username){
            const uri = baseURL + "_doc/" + username
            return fetcher.makeGetRequest(uri)
                .then(response => response)
                .catch(err => false)
        },
        getUser: async function (username, password) {
            const userExists = await this.checkUser(username)
            if(!userExists) throw 'Invalid username.'
            const user = userExists._source
            let bufferObj = Buffer.from(password, "utf8");
            if (user.password === bufferObj.toString('base64')) {
                return user;
            }
            throw 'Invalid password.';
        },


        createUser: async function (username,password, first_name, last_name) {
            const uri = baseURL + "_doc/" + username
            let bufferObj = Buffer.from(password, "utf8");
            const body = {
                username: username,
                password: bufferObj.toString('base64'),
                first_name: first_name,
                last_name: last_name
            }
            return await fetcher.makePutRequest(uri,body)
        }*/

        createUser: async function (username, password, first_name, last_name) {
            return authization.user.create(username, password)
                .then(res => {
                    return response.create(response.CREATED, 'User Created successfully')
                })
                .catch(err => {
                    throw error.create(err.status, err.message)
                })

        },

        checkIfUserExists: async function(username){
            return !!(await authization.user.getByUsername(username))
        },

        loginLocal: async function (req, res) {
            console.log('logging in, req.isAuthenticated(): ', req.isAuthenticated())
            if (!req.isAuthenticated()) {
                res.status(error.UNAUTHORIZED).send(error.create(error.UNAUTHORIZED, 'Error logging in'))
            }else {
                res.status(response.OK).send(response.create(response.OK, 'Login was successful'))
            }
        },

        logout: async function(req, res){
            console.log(`req.isAuthenticated(): ${req.isAuthenticated()}`)
            if (req.isAuthenticated()) {
                res.status(error.ARGUMENT_ERROR).send(error.create(error.ARGUMENT_ERROR, 'Error logging out'))
            }else {
                res.send(response.create(response.OK, 'Logout was successful'))
            }
        }
    }
}

module.exports = makeAuth