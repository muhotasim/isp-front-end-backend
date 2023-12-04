import axios from 'axios'
import appConst from '../constants/app.constants'
import { getToken } from './utils'
const module = 'categories'
export const index = ({ query = {}, perPage = 20, page = 1, getCount = 1 }) => {
    let search = new URLSearchParams();
    Object.keys(query).forEach(key => {
        search.append(key, query[key])
    })
    search.append('perPage', perPage)
    search.append('page', page)
    search.append('getCount', getCount)
    return new Promise((res, rej) => {
        axios.get(appConst.apiRoute + module + '?' + search.toString(), { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}
export const create = async ({ title, content_body, meta_title, meta_key, meta_description, no_follow, no_index, status }) => {
    return await axios.put(appConst.apiRoute + module,
        { title, content_body, meta_title, meta_key, meta_description, no_follow, no_index, status }, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
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
export const update = async (id, { title, content_body, meta_title, meta_key, meta_description, no_follow, no_index, status }) => {
    return await axios.patch(appConst.apiRoute + module + '/' + id, { title, content_body, meta_title, meta_key, meta_description, no_follow, no_index, status }, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    })
}
export const remove = (id) => {
    return new Promise((res, rej) => {
        axios.delete(appConst.apiRoute + module + '/' + id, {
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