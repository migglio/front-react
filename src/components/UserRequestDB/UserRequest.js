import Axios from 'axios'
import url from '../../config.js'

class UserRequest{

    static getUser(id, callback){
        Axios.get(url.api+'user/'+id)
        .then((response)=>{
            callback(response.data);
        })
        .catch(function (error) {
          alert(error);
        })
    }
}

export default UserRequest;