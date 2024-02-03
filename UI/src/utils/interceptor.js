import axios from "axios";

// axios instance can be used to call an API given the config as parameter
const axios_instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {'Content-Type' : "application/json"}
});


// this is like a middleware for react, i.e., gets called everytime before a request hits the API.
// So instead of adding headers for each API call, we can manimulate the config object here 
// at a single place

// We need to import this file in app.jsx

axios.interceptors.request.use((config)=>{
    const token = sessionStorage.token;
    if(token)
    {
        config.headers['Authorization'] = 'Bearer '+ token;
    }
    return config;
}, (error)=>{
    return Promise.reject(error)
});

axios.interceptors.response.use((config)=>{
    return config;
}, (error)=>{
    // console.log(error)
    if(error.response?.status === 403)
    {
        // this guy returns whatever the '.then' block returns.
        // if '.then' does not return anything, it return the response
        return axios.post('http://localhost:8080/refreshToken',{
            refreshToken: sessionStorage.getItem('refreshToken')
        })
        .then((resp)=> {
            if(resp.data.success)
            {
                // We dont exactly know which API was called when the jwt expired.
                // But the error.config object has all that info.
                // So we can simply update the JWT in that config obj and recall the API using 
                // axios instance.
                sessionStorage.setItem('token', resp.data.token);
                error.config.headers["Authorization"] = "Bearer " + resp.data.token;
                return axios_instance(error.config);
            }
        })
        .catch((err)=> {
            return Promise.reject(err);
        })
    }
    else if(error.response?.status === 401)
    {
        sessionStorage.clear();
        window.location.replace('/');
    }
    else
    {
        return error;
    }
})
