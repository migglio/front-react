import axios from 'axios'
import url from '../../config.js'


class NotificationSaver {

    static addNewNotification(owner, idTrip, type, users){
        const userData = {
            owner: owner,
			idTrip: idTrip,
            type: type,
            users: users,
		}
		axios.post(url.socket + 'api/notifications/newNotification', userData, url.config)
		.then((response) => {
            console.log(response)
        })
		.catch((error) => {
            console.log(error)
        })
    }


    static markAsRead(idNotification, users){

        const userData = {
            idNotification: idNotification,
            users: users,
        }
        
        axios.put(url.socket + 'api/notifications/markAsRead', userData, url.config)
		.then((response) => {
            alert('anduvo')
            console.log(response)
        })
		.catch((error) => {
            alert('fallo')
            console.log(error)
        })

    }


}

export default NotificationSaver;