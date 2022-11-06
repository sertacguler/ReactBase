import useAuth from "./Hooks/useAuth";
import useHttp from "./Hooks/useHttp";

const LoginPage = () => {

    const {login} = useAuth;

    return (
        <button onClick={login("admin","admin123")}/>
    )

}

export default LoginPage;

/* 
    const {sendRequest} = useHttp;
    sendRequest({
            url:'http//localhost:/get',
            method : 'GET',})
            .then((response) => {
                return response;
    })
*/