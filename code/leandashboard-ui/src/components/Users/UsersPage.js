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
    const { get, del, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)

    useEffect(() => {
        loadUsers().then(() => {
            console.log(response.data)
        })
    }, [refresh])

    useEffect(() => {
        checkIfUserIsSuperuser()
            .then(() => console.log(`User is superuser: ${userIsSuperuser}`))
    }, [userIsSuperuser])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadUsers() {
        // const getUsers = await get('/api/lean/users')

        // if (getUsers) {
        //     setUsers(getUsers)
        // }
        // else setUsers([])

        // const usersWithRoles = getUsers.map(user => {
        //     /*const userRoles = get(`/api/lean/users/${user.username}/roles`)
        //     return user['roles'] = userRoles*/
        //     return get(`/api/lean/users/${user.username}/roles`)
        //         .then(roles => user['roles'] = roles)
        // })

        // if(usersWithRoles){
        //     setUsers(usersWithRoles)
        // }else setUsers([])
        // console.log(usersWithRoles);
        const users = await get('/api/lean/users')
        const usersWithRoles = users.map(async user => {
            const roles = await get(`/api/lean/users/${user.username}/roles`);
            let temp = user;
            temp['roles'] = roles;
            return temp;
        })

        if (Promise.all(usersWithRoles)) {
            setUsers(usersWithRoles)
        }
        else setUsers([])
        console.log('fim do loadUsers')

    }

    async function deleteUser(username) {
        const deleteUser = await del(`/api/lean/users/${username}`)
        console.log('alisa')
        if (response.ok) {
            alert('User was deleted')
        } else {
            alert(deleteUser.message)
        }
        //alert(`Deleted user with ID ${username}`)
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
                                            <NavBar component={<UsersTable projects={users} refresh={doRefresh} userIsManager={userIsSuperuser} deleteIconOnClick={deleteUser} />} title={"LeanDashboard"} />
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