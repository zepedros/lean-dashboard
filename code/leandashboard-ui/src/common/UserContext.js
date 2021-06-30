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

const UserContext = React.createContext({})

function UserProvider({ Username }) {
    // Context state
    const [user, setUser] = useState(Username)
    const history = useHistory()
    const [rbac, setRbac] = useState(undefined)
    const { get, response } = useFetch('http://localhost:3000/api', { credentials: "same-origin" })
    //  const [perms, setPerms] = usePermission()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // get user role
                // get authenticated User's Roles
                await get(`/api/lean/users/${Username}/roles`)
                console.log(response)
                const roles = response.data
                const setupRbac = new AuthizationRbac();
                await setupRbac.init();
                setupRbac.roles = roles;
                setRbac(setupRbac)
                console.log('setRbac')
            } catch (err) {
                console.error(err)
                return
            }
        }
        fetchData().then(() => {
            history.push('/projects')
        })
    }, [])

    return (
        <div>
            <UserContext.Provider value={{ rbac, user }} />
        </div>
    )
}

export default UserContext;
export const UserConsumer = UserContext.Consumer;
export { UserProvider };
