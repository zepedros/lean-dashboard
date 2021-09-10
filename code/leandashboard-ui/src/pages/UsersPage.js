import { Hidden } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { useContext, useEffect, useState } from 'react';
import useFetch from 'use-http';
import UserContext from '../common/UserContext';
import img from '../images/Forbidden.png';
import Error from '../components/Common/Errors/Error';
import NavBar from '../components/Common/NavBar';
import UsersList from '../components/Users/UsersList';
import UsersTable from '../components/Users/UsersTable';

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [refresh, setRefreshProjects] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)
    const { get, del, post, put, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)

    useEffect(() => {
        loadUsers()
    }, [refresh])

    useEffect(() => {
        checkIfUserIsManager()
        console.log(`User is manager: ${userIsManager}`)
    }, [userIsManager])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadUsers() {
        let getUsers = await get('/api/lean/users')

        for (let i = 0; i < getUsers.length; i++) {
            const userRoles = await get(`/api/lean/users/${getUsers[i].username}/roles`)
            getUsers[i]['roles'] = userRoles
        }
        if (getUsers) {
            setUsers(getUsers)
        }
        else setUsers([])
    }

    async function deleteUser(username) {
        const deleteUser = await del(`/api/lean/users/${username}`)
        if (response.ok) {
            alert('User was deleted')
        } else {
            alert(deleteUser.message)
        }
        doRefresh()
    }

    async function removeRoleFromUser(username, role) {
        const removeRole = await del(`/api/lean/users/${username}/roles/${role}`)
        if (response.ok) {
            alert(`The role ${role} was removed from the user ${username}`)
        } else {
            alert(removeRole.message)
        }
    }

    async function addRoleToUser(username, role) {
        const body = { "role": role }
        const removeRole = await post(`/api/lean/users/${username}/roles`, body)
        console.log('giving user role');
        if (response.ok) {
            alert(`The role ${role} was given to the user ${username}`)
        } else {
            alert(removeRole.message)
        }
    }

    async function changeUsername(username, newUsername) {
        console.log('username changed');
        const res = await put(`lean/users/${username}/username`, { "newUsername": newUsername })
        if (res.statusCode === 200) {
            alert(`Changed username of ${username} to ${newUsername} sucessfully`)
            doRefresh()
        } else {
            alert(res.message || `Error changing ${username}'s username`)
        }
    }

    async function changePassword(username, newPassword) {
        console.log('password changed');
        const res = await put(`lean/users/${username}/password`, { "newPassword": newPassword })
        if (res.statusCode === 200) {
            alert(`Changed password of user ${username} sucessfully`)
            doRefresh()
        } else {
            alert(res.message || `Error changing ${username}'s username`)
        }
    }

    /*
    async function checkIfUserIsSuperuser() {
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        if (userInfo.id === 1) {
            setUserIsSuperuser(true)
        } else {
            setUserIsSuperuser(false)
        }
    }*/

    async function checkIfUserIsManager() {
        const userRoles = await get(`/api/lean/users/${context.credentials.username}/roles`)
        let isManager = false
        console.log(userRoles)
        if(userRoles != undefined){
            userRoles.forEach(role => {
                if (role.role === 'manager' || role.role === 'admin') {
                    isManager = true
                }
            })

            setUserIsManager(isManager)
        }
    }


    return (
        <div>
            {
                loading ?
                    <CircularProgress color="primary" style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} />
                    :
                    <div>
                        {
                            userIsManager ?
                                <div>
                                    <Hidden mdUp>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <NavBar component={<UsersList users={users} refresh={doRefresh} deleteUser={deleteUser} removeRoleFromUser={removeRoleFromUser} addRoleToUser={addRoleToUser} changeUsername={changeUsername} changePassword={changePassword} />} title={"LeanDashboard"} />
                                        </Grid>
                                    </Hidden>
                                    <Hidden smDown>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <NavBar component={<UsersTable users={users} refresh={doRefresh} deleteUser={deleteUser} removeRoleFromUser={removeRoleFromUser} addRoleToUser={addRoleToUser} changeUsername={changeUsername} changePassword={changePassword} />} title={"LeanDashboard"} />
                                        </Grid>
                                    </Hidden>
                                </div>
                                :
                                <Error statusCode={403} message={`You can't access this page`} customImage={img} />
                        }
                    </div>
            }
        </div>

    );
}