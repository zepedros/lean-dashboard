import ProjectsList from '../components/Projects/ProjectsList'
import ProjectsTable from '../components/Projects/ProjectsTable'
import Grid from '@material-ui/core/Grid';
import NavBar from '../components/Common/NavBar'
import { Hidden } from '@material-ui/core';
import useFetch from 'use-http'
import { useState, useEffect, useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../common/UserContext';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [refresh, setRefreshProjects] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)
    const { get, response, loading } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    const context = useContext(UserContext)

    useEffect(() => {
        loadProjects().then(() => {
            console.log(response.data)
        })
    }, [refresh])

    useEffect(() => {
        checkIfUserIsManager()
            .then(() => console.log(`User is manager: ${userIsManager}`))
    }, [userIsManager])

    function doRefresh() {
        setRefreshProjects(!refresh)
    }

    async function loadProjects() {
        const getProjects = await get('/api/lean/projects')
        
        if (getProjects) {
            for(let project of getProjects){
                const owner = await getUsername(project.owner)
                console.log(owner)
                project.owner = owner.username
            }
            if (response.ok) setProjects(getProjects)
        }
        else setProjects([])
    }

    async function getUsername(owner) {
        return await get(`/api/lean/users/${owner}`)
    }

    async function checkIfUserIsManager() {
        const userRoles = await get(`/api/lean/users/${context.credentials.username}/roles`)
        let userIsManager = false
        console.log(userRoles)
        if(userRoles != undefined){
            userRoles.forEach(role => {
                if (role.role === 'manager' || role.role === 'admin') {
                    userIsManager = true
                }
            })
            setUserIsManager(userIsManager)
        }
    }

    return (
        <div>

                    <div>
                        <Hidden mdUp>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={loading ? <CircularProgress color="primary" />: <ProjectsList projects={projects} refresh={doRefresh} userIsManager={userIsManager} /> } title={"LeanDashboard"} />
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12} sm={12} md={12}>
                                <NavBar component={loading ? <CircularProgress color="primary" /> : <ProjectsTable projects={projects} refresh={doRefresh} userIsManager={userIsManager} />} title={"LeanDashboard"} />
                            </Grid>
                        </Hidden>
                    </div>
            
        </div>

    );
}