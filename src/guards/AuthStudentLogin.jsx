import { Navigate } from 'react-router-dom';
import AuthStudent from '../services/StudentServices';


const StudentLoginAuthGuard = () => {
    const { getToken } = AuthStudent();

    let auth = { 'token': getToken() }
    return (
        auth.token ? <Navigate to="/student/dashboard" /> : <></>
    )
}

export default StudentLoginAuthGuard;