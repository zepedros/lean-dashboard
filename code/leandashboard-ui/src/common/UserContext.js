import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import useFetch from 'use-http'
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

/*
//nao e usado??
export const usePermission = (resource, roles) => {
    const [rbac, setRbac] = useState(undefined);
    const [permissions, setPermissions] = useState(['']);
    useEffect(() => {
        //chamada a api para obter o rbac do utilizador
        configService().getRbacOptions().then(options => setRbac(new AuthizationRbac(options)));
    }, []);
    const setPerms = useCallback(() => {
        //configurar as permissoes do utilizador
        const possiblePerms = [{ action: 'GET' }, { action: 'POST' }, { action: 'PUT' }, { action: 'DELETE' }].map(value => ({ ...value, resource }));
        console.log('roles:', roles)
        if (rbac) {
            setPermissions(rbac.canAll(roles, possiblePerms));
        }
    }, []);
    useEffect(() => {
        if (rbac) {
            rbac.init().then(() => {
                setPerms();
            });
        }
    }, [rbac]);
    useEffect(() => { console.log('perms:', permissions) }, [permissions]);

    return [permissions, setPerms];
};
*/

export function createRepository(get, post) {
    const KEY = 'lean-dashboard-credentials'
    return {
        //returns credentials if any
        isLoggedIn: () => {
            const credentials = localStorage.getItem(KEY)
            return credentials ? JSON.parse(credentials) : undefined
        },
        login: (username, password, remember, history, set) => {
            //login
            post("/lean/login", { username: username, password: password }).then((response) => {
                if (response.statusCode === 200) {
                    const credentials = { username: username, password: password }
                    set(credentials)
                    if (remember) localStorage.setItem(KEY, JSON.stringify(credentials))
                    else sessionStorage.setItem(KEY, JSON.stringify(credentials))
                    return get(`/api/lean/users/${username}/roles`).then((res) => {
                        sessionStorage.setItem('user-rbac', JSON.stringify(res))
                        history.push('/projects')
                    })
                } else {
                    console.log('ERROR')
                    //error
                    return false
                }
            })
        },
        logout: (history, set) => {
            post("/lean/logout").then((response) => {
                if (response.statusCode === 200) {
                    set()
                    console.log('log out')
                    localStorage.removeItem(KEY)
                    sessionStorage.removeItem(KEY)
                    sessionStorage.removeItem('user-rbac')
                    history.push('/')
                    return createRepository(get,post)
                }
            })
        }
    }
}

export const UserContext = React.createContext({})
export default UserContext;
