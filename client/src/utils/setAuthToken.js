import axios from 'axios';

// 当存在token的时候，将token加入header中，否则清空header中原来的token
// 发送给后端的middleware/auth
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
