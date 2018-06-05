import cfg from "./config/cfg";
import io from 'socket.io-client';

module.exports = io(cfg.WS, {
    transports: ['websocket']
  });