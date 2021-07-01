import { Redirect } from 'react-router-dom'
import UserContext from './UserContext'
/**
 * Component responsible for verifying if the user has already entered his credentials.
 */
export default function EnsureCredentials({ redirect, children }) {
    return <UserContext.Consumer>
        {value => value && value.credentials ? <> {children} </> : <Redirect to={redirect} />}
    </UserContext.Consumer>
}
