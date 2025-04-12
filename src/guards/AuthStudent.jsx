import { Navigate } from 'react-router-dom';
import AuthStudent from '../services/StudentServices';


const StudentAuthGuard = () => {

    const { getToken } = AuthStudent();

    let auth = { 'token': getToken() }
    return (
        auth.token ? <> </> : <Navigate to="/student-login" />
    )
}

export default StudentAuthGuard;