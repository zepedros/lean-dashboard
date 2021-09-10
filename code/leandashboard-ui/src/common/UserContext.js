import React from 'react'

const { RBAC } = require('rbac')

class AuthizationRbac {
    rbac_options = {};
    roles = [];
    init() {
        this.rbac_options = {
            roles: ["manager", "admin", "guest", "Colaborator"],
            permissions: {
                lean: ['get', 'post', 'put', 'delete']
            },
            grants: {
                manager: ['get_lean', 'post_lean', 'put_lean', 'delete_lean'],
                Colaborator: ['get_lean']
            }
        }
        this.rbac = new RBAC(this.rbac_options)
        if (Array.isArray(this.rbac_options.roles) && typeof (this.rbac_options.permissions) === 'object' && typeof (this.rbac_options.grants) === 'object') {
            return this.rbac.init()
        }
        throw Error("rbac options sent to the constructor were invalid")
    }

    can(action, resource) {
        console.log('inside can')
        let arr = []
        this.roles.forEach(role => arr.push(this.rbac.can(role, action, resource)));
        return Promise.all(arr).then(
            array => { return array.some(bool => bool === true) }
        )
    }

    canAll(permissions) {
        const canall = this.roles.some(role => this.rbac.canAll(role, permissions));
        return permissions.map(p => canall);
    }

    canAny(permissions) {
        return this.roles.some(role => this.rbac.canAny(role, permissions));
    }
}

export function createRepository(get, post) {
    const KEY = 'lean-dashboard-credentials'
    return {
        //returns credentials if any
        isLoggedIn: () => {
            let credentials = localStorage.getItem(KEY)
            if(!credentials) {
                credentials = document.cookie.split("=")[1]
            }
            return credentials ? JSON.parse(credentials) : undefined
        },
        login: (username, password, remember, history, set) => {
            //login
            console.log('logging in')
            post("/lean/login", { username: username, password: password }).then((response) => {
                if (response.statusCode === 200) {
                    const credentials = { username: username }
                    document.cookie = `session=${JSON.stringify(credentials)}; expires=0`
                    localStorage.setItem("session", username)
                    set(credentials)
                    if (remember) localStorage.setItem(KEY, JSON.stringify({ username: username, password: password }))
                    else sessionStorage.setItem(KEY, JSON.stringify(credentials))
                    return get(`/api/lean/users/${username}/roles`).then((res) => {
                        sessionStorage.setItem('user-rbac', JSON.stringify(res))
                        history.push('/projects')
                    })
                } else {
                    console.log('login failed')
                    alert(response.message || 'There was an error logging in')
                    return false
                }
            })
        },
        logout: (history, set) => {
            post("/lean/logout").then((response) => {
                if (response.statusCode === 200) {
                    document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
                    set()
                    console.log('log out')
                    localStorage.removeItem(KEY)
                    sessionStorage.removeItem(KEY)
                    sessionStorage.removeItem('user-rbac')
                    localStorage.setItem("session", "")
                    history.push('/')
                    return createRepository(get,post)
                }
            })
        }
    }
}

export const UserContext = React.createContext({})
export default UserContext;
