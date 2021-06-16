export default function DashboardsPage() {

    return (
        <div>
            <Hidden mdUp>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component = {<ProjectsList projects={testITems}/>}/>
            </Grid>
            </Hidden>
            <Hidden smDown>
            <Grid item xs={12} sm={12} md={12}>
                <NavBar component = {<ProjectsCards projects={testITems}/>}/>
            </Grid>
            </Hidden>
        </div>
    );
}