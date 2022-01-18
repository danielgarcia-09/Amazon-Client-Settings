import axiosClient from "./axios";

const tokenAuth = (token: string) => {
    if( token ) {
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;