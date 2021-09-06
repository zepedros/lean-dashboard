import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from 'use-http';

export default function DeleteDashboardDialog({showDeleteDialog,setShowDeleteDialog}){
    var { del, response } = useFetch(process.env.REACT_APP_API_FETCH_URI, { cachePolicy: "no-cache", credentials: "same-origin" })
    let { id, dashboardId } = useParams();
    const history = useHistory()

      function handleCloseDeleteDashboard(){
        setShowDeleteDialog(false)
      }
      async function deleteDashboard() {
        await del(`/api/lean/projects/${id}/dashboard/${dashboardId}`)
        if (response.ok) {
          history.push(`/projects/${id}/dashboards`)
        }
      }

    return (
        <Dialog
          open={showDeleteDialog}
          onClose={handleCloseDeleteDashboard}
          aria-labelledby="delete-user-alert-dialog"
          aria-describedby="alert dialog to handle user deletion"
        >
          <DialogTitle id="alert-dialog-title">{`Do you want to delete ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting a dashboard is not reversible 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDashboard} color="primary">
              Cancel
            </Button>
            <Button onClick={() => deleteDashboard()} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )
}