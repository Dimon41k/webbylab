import axios from 'axios';
import cfg from '../config/cfg'

export default axios.create({
    baseURL: cfg.host
});