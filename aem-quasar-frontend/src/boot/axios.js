import axios from 'axios'

const api = axios.create({
    baseURL: process.env.END_POINT_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})
api.interceptors.request.use(req => {
    const token = localStorage.getItem('token')
    if (typeof token !== 'undefined') {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        req.headers.lang = `${localStorage.getItem('lang')}`
    }
    return req
})
export { api }
