const passport = require('passport');
const session = require('express-session');
const fetcher = require('./uri-fetcher')
const FileStore = require('session-file-store')(session);

const error = require('./error')
const response = require('./responses')

function makeAuth(authization) {
    return {
        createUser: async function (username, password, first_name, last_name) {
            return authization.user.create(username, password)
                .then(res => {
                    return response.makeResponse(response.CREATED, 'User Created successfully')
                })
                .catch(err => {
                    throw error.makeErrorResponse(err.status, err.message)
                })

        },

        checkIfUserExists: async function(username){
            return !!(await authization.user.getByUsername(username))
        },

        checkIfUserHasRole: async function(user, roleName){
            const roles = await authization.userRole.getByUser(user.id)
            let ret = false
            roles.forEach(role => {
                if(role.role === roleName) ret = true
            })
            return ret
        },

        getUserByUsername: async function(username){
            //just get a certain user by name from db, throw an error if non existing
            const user = await authization.user.getByUsername(username)
            if (user){
                return user
            }else {
                throw error.makeErrorResponse(error.NOT_FOUND, "User doesn't exist")
            }
        },

        getRoleByName: async function(roleName){
            //just the a certain role by name from db, throw an error if non existing
            const role = await authization.role.getByName(roleName)
            if (role){
                return role
            }else {
                throw error.makeErrorResponse(error.NOT_FOUND, `Role ${roleName} doesn't exist`)
            }
        },


        giveUserRole: async function(user, role, startDate, endDate, updater){
            /**
             * return the create method. if it's all good, just return a response. else, check error status and message and  throw error
             */
            return authization.userRole.create(user.id, role.id, startDate, endDate, updater.id, true)
                .then(res => {
                    return response.makeResponse(response.CREATED, `User ${user.username} was given the role ${role.role}`)
                })
                .catch(err => {
                    throw error.makeErrorResponse(err.status, err.message)
                })
        },

        removeRoleFromUser: async function(user, role){
            /**
             * return the delete method. if it's all good, just return a response. else, check error status and message and  throw error
             */
            const test = await authization.userRole.delete(user.id, role.id)
            return authization.userRole.delete(user.id, role.id)
                .then(res => {

                    return response.makeResponse(response.OK, `User ${user.username} got the role ${role.role} removed`)
                })
                .catch(err => {
                    throw error.makeErrorResponse(err.status, err.message)
                })
        },


        loginLocal: async function (req, res) {
            //just checks if it's authenticated or not, sending an error if not
            console.log('logging in, req.isAuthenticated(): ', req.isAuthenticated())
            if (!req.isAuthenticated()) {
                res.status(error.UNAUTHORIZED).send(error.makeErrorResponse(error.UNAUTHORIZED, 'Error logging in'))
            }else {
                res.status(response.OK).send(response.makeResponse(response.OK, 'Login was successful'))
            }
        },

        logout: async function(req, res){
            console.log(`req.isAuthenticated(): ${req.isAuthenticated()}`)
            if (req.isAuthenticated()) {
                res.status(error.ARGUMENT_ERROR).send(error.makeErrorResponse(error.ARGUMENT_ERROR, 'Error logging out'))
            }else {
                res.send(response.makeResponse(response.OK, 'Logout was successful'))
            }
        }
    }
}

module.exports = makeAuth