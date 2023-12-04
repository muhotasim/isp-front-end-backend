import axios from 'axios'
import appConst from '../constants/app.constants'
import { getToken } from './utils'
const module = 'settings'
export const index = () => {
    return new Promise((res, rej) => {
        axios.get(appConst.apiRoute + module , { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}
export const get = async (id) => {
    return await axios.get(appConst.apiRoute + module + '/' + id, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    })
}
export const update = async (id, { value }) => {
    return await axios.patch(appConst.apiRoute + module+ '/' + id, { value }, { 
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
     })
}