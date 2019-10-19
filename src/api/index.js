import axios from '../lib/ajaxRequest';
// 全部是promise
export const getTest = () => axios.request({ url: '/test' });
export const login = param => axios.request({ url: '/login', method: 'POST', data: param });
export const validate = () => axios.request({ url: '/validate' });

export default {};
