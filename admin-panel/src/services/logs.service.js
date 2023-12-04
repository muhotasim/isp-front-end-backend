import axios from 'axios'
import appConst from '../constants/app.constants'
import { getToken } from './utils'
const module = 'logs'
export const index = ({ }) => {

    return new Promise((res, rej) => {
        axios.get(appConst.apiRoute + module, { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}

export const get = async (filename) => {
    return await axios.get(appConst.apiRoute +module+ '/'+filename, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    })
}

export const remove = (filename) => {
    return new Promise((res, rej) => {
        axios.delete(appConst.apiRoute + module + '/'+filename, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'application/json'
            }
        }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}