import axios from 'axios';


// Use this config for all client based requests, including admin login
export const ifawfClient = axios.create({
    baseURL:'https://h5zwtcapne.execute-api.us-east-2.amazonaws.com/PROD',
    headers: {
        "Content-Type":"application/json"
    }
});


// Use this for all admin based requests, not including logging in.
export const ifawfAdmin = axios.create({
    baseURL:"https://h5zwtcapne.execute-api.us-east-2.amazonaws.com/PROD",
    headers: {
        "Content-Type":"application/json",
        "Authorization":""
    }
});


//Ensure that token is attached to each request.
ifawfAdmin.interceptors.request.use(function(request) {
    const token = localStorage.getItem("TOKEN");
    if(token == null) {
        return Promise.reject("Not authorized");
    }
    request.headers['Authorization'] = 'bearer '+token;
    return request;
});

// Extract only the data from the request. Who cares about the rest.
ifawfClient.interceptors.response.use(function(response) {
    console.log(response);
    return response.data.data;
})