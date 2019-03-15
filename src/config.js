import Auth from './components/Auth/Auth.js'

const config = {
    //local host
//    socket:"http://localhost:8000/",
//    api: "http://localhost:8000/api/",

//   web address
    socket:"https://59vnkt9ad8.execute-api.us-east-1.amazonaws.com/dev/",
    api: "https://59vnkt9ad8.execute-api.us-east-1.amazonaws.com/dev/api/",
    config: {headers: {"authorization": "Bearer: " + Auth.getToken()}}
    }

export default config