import axios from 'axios'
import config from '../config/app.base'

const http = axios.create({
  baseURL: config.baseApiUrl
})

export default http
