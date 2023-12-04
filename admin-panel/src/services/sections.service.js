import axios from 'axios'
import appConst from '../constants/app.constants'
import { getToken } from './utils'
const module = 'section'
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
export const all = () => {

    return new Promise((res, rej) => {
        axios.get(appConst.apiRoute + module+'/all', { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}
export const getSectionContent = (section_id) => {

    return new Promise((res, rej) => {
        axios.get(appConst.apiRoute +'section-content?section_id='+section_id, { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}
export const addBulkSectionContent = (contents) => {

    return new Promise((res, rej) => {
        axios.put(appConst.apiRoute +'section-content/bulk',{ contents: JSON.stringify(contents) }, { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}
export const deleteSectionContent = (section_id) => {

    return new Promise((res, rej) => {
        axios.delete(appConst.apiRoute +'section-content?section_id='+section_id, { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } }).then(response => {
            res(response);
        }).catch(err => {
            rej(err);
        })
    })
}

export const create = async ({ title, status, type, name }) => {
    return await axios.put(appConst.apiRoute + module,
        { title, status, type, name }, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    })
}
export const createBulk = async (contents) => {
    return await axios.put(appConst.apiRoute + 'page-section/bulk',
        { contents }, {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json'
        }
    })
}
export const deletePageSections = async ({page_id, section_id}) => {
    let qString = new URLSearchParams()
    if(page_id)qString.append('page_id',page_id)
    if(section_id)qString.append('section_id',section_id)
    return await axios.delete(appConst.apiRoute + 'page-section?'+qString.toString(), {
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
export const update = async (id, { title, status, type, name }) => {
    return await axios.patch(appConst.apiRoute + module + '/' + id, { title, status, type, name }, {
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