import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AddDialog from '../Common/AddDialog.js';
import ProjectUsersItem from './ProjectUsersItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        position: "fixed",
        right: '5%',
        bottom: '15%',
        background: 'linear-gradient(45deg, #3CAA91 30%, #3CAA91 90%)',
        color: 'white',

    },
    filter: {
        position: "relative",
        left: "45%"
    },
}));

export default function ProjectUsersList({ users, refresh, deleteUser }) {
    const classes = useStyles();
    const [showFilter, setShowFilter] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    function handleFilter() {
        setShowFilter(!showFilter)
    }

    function handleOpenDialog() {
        setShowDialog(true)
    }

    console.log(users)

    return (
        <div>
            <Container className={classes.root}>
                <Typography component="h1" variant="h5">
                    <FormattedMessage id="Settings.userManagement" />
                </Typography>
                <IconButton end='end' className={classes.filter} onClick={handleFilter}>
                    <FilterListIcon />
                </IconButton>
                {users.length === 0 ?
                    <Typography component="h1" variant="h5">
                        No users
                    </Typography>
                    :
                    <List dense={false} style={{ maxHeight: '70%', overflow: 'scroll' }}>
                        {users && users.map(user => {
                            return <ProjectUsersItem key={user.id} user={user} deleteUser={deleteUser} />
                        })}
                    </List>
                }
                <AddDialog showDialog={showDialog} setShowDialog={setShowDialog} title={<FormattedMessage id="Projects.dialogButton.title" />} type={<FormattedMessage id="Projects.dialogButton.subTitle" />} refreshProjects={refresh} showDate={true} />
            </Container>
        </div>
    );
}