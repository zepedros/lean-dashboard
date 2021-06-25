import ProjectsList from './ProjectsList'
import ProjectsTable from './ProjectsTable'
import Grid from '@material-ui/core/Grid';
import NavBar from '../Common/NavBar'
import { Hidden } from '@material-ui/core';

import { Container } from '@material-ui/core';
import { useContext } from 'react';
import UserContext from '../../common/UserContext';
import useFetch from 'use-http'
import { useState, useEffect } from 'react'



const testITems = [
    {
        pid: 1,
        name: 'abc',
        description: 'description',
        owner: 'Manager',
        state: 'Open'
    },
    {
        pid: 2,
        name: 'def',
        description: 'description'
    },
    {
        pid: 3,
        name: 'ghi',
        description: 'description'
    },
    {
        pid: 4,
        name: 'ghi',
        description: 'description'
    },
    {
        pid: 5,
        name: 'ghi',
        description: 'description'
    },
    {
        pid: 6,
        name: 'ghi',
        description: 'description'
    }
]




export default function ProjectsPage() {

        const [projects,setProjects] = useState([])
        const {  get, post, response, loading, error } = useFetch('http://localhost:3000/api', { credentials: "same-origin"})

        useEffect(() => {loadProjects()},[])

        async function loadProjects(){
            const projects= await get('/api/lean/projects')
            if(response.ok) setProjects(projects)
            console.log(projects)
        }
        
    return (
        <div>
            <Hidden mdUp>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<ProjectsList projects={projects} />} title={"LeanDashboard"} />
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar component={<ProjectsTable projects={projects} />} title={"LeanDashboard"} />
                </Grid>
            </Hidden>
        </div>
    );
}