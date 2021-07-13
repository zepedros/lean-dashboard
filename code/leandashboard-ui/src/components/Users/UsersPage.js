import UsersTable from './UsersTable'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import useFetch from 'use-http'
import { useState, useEffect, useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../../common/UserContext';
import Error from '../Common/Errors/Error'
import img from '../../images/Forbidden.png'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [refresh, setRefreshProjects] = useState(false)
    const [userIsSuperuser, setUserIsSuperuser] = useState(true)
    const { get, del, post, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)

    useEffect(() => {
        loadUsers()
    }, [refresh])

    useEffect(() => {
        checkIfUserIsSuperuser()
            .then(() => console.log(`User is superuser: ${userIsSuperuser}`))
    }, [userIsSuperuser])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadUsers() {
        let getUsers = await get('/api/lean/users')

        for(let i = 0; i < getUsers.length; i++){
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
        //alert(`Deleted user with ID ${username}`)
    }

    async function removeRoleFromUser(username, role){
        const removeRole = await del(`/api/lean/users/${username}/roles/${role}`)
        if (response.ok){
            alert(`The role ${role} was removed from the user ${username}`)
        } else {
            alert(removeRole.message)
        }
    }

    async function addRoleToUser(username, role){
        const body = {"role" : role}
        const removeRole = await post(`/api/lean/users/${username}/roles`, body)
        console.log('giving user role');
        if (response.ok){
            alert(`The role ${role} was given to the user ${username}`)
        } else {
            alert(removeRole.message)
        }
    }

    async function checkIfUserIsSuperuser() {
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        if (userInfo.id === 1) {
            setUserIsSuperuser(true)
        } else {
            setUserIsSuperuser(false)
        }
    }


    return (
        <div>
            {
                loading ?
                    <CircularProgress color="primary" />
                    :
                    <div>
                        {
                            userIsSuperuser ?
                                <div>
                                    <Hidden mdUp>
                                        <Grid item xs={12} sm={12} md={12}>

                                        </Grid>
                                    </Hidden>
                                    <Hidden smDown>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <NavBar component={<UsersTable users={users} refresh={doRefresh} userIsManager={userIsSuperuser} deleteUser={deleteUser} removeRoleFromUser={removeRoleFromUser} addRoleToUser={addRoleToUser}/>} title={"LeanDashboard"} />
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