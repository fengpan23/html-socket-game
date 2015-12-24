"use strict";
const util = require('util');
const eventEmitter = new require('events').EventEmitter;

function safeParse(data){
    let result = null;
    try{
        result = JSON.parse(data);
    }catch(e){
        console.error('parse data to json error :', e);
    }
    return result;
}

class Parser{
    constructor() {
        eventEmitter.call(this);
    };
    write(data) {
        if((data.length <= 0 ) || (!Buffer.isBuffer(data)))return;
        let payload_data, masks;
        //let mask_flag = (data[1] & 0x80 == 0x80) ? 1 : 0;//All frames sent from client to server have this bit set to 1.
        let payload_len = data[1] & 0x7F;//0111 1111

        if(payload_len == 126){
            masks = data.slice(4,8);
            payload_data = data.slice(8);
            payload_len = data.readUInt16BE(2);
        }else if(payload_len == 127){
            masks = data.slice(10,14);
            payload_data = data.slice(14);
            payload_len = data.readUInt32BE(2) * Math.pow(2,32) + data.readUInt32BE(6);
        }else{
            masks = data.slice(2,6);
            payload_data = data.slice(6);
        }
        for(let i=0; i< payload_len; i++ ){
            payload_data[i]= payload_data[i] ^ masks[i%4];
        }
        let result = payload_data.toString('utf8');
        this.emit('message', result && safeParse(result));
    };
};
util.inherits(Parser, eventEmitter);
module.exports = new Parser();