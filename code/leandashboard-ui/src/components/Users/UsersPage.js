import ProjectsTable from './UsersTable'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';
import useFetch from 'use-http'
import { useState, useEffect, useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../../common/UserContext';

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [refresh, setRefreshProjects] = useState(false)
    const [userIsSuperuser, setUserIsSuperuser] = useState(false)
    const { get, response, loading } = useFetch('http://localhost:3000/api', { cachePolicy: "no-cache", credentials: "same-origin" })
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
        const getUsers = await get('/api/lean/users')
        let ret
        console.log('alisa');
        if (getUsers) {
            setUsers(getUsers)
        }
        else setUsers([])
    }

    async function checkIfUserIsSuperuser() {
        const userInfo = await get(`/api/lean/users/username/${context.credentials.username}`)
        if(userInfo.id === 1){
            setUserIsSuperuser(true)
        }else {
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
                        <Hidden mdUp>
                            <Grid item xs={12} sm={12} md={12}>
                               
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={<ProjectsTable projects={users} refresh={doRefresh} userIsManager={userIsSuperuser} />} title={"LeanDashboard"} />
                            </Grid>
                        </Hidden>
                    </div>
            }
        </div>

    );
}