var express = require('express');
var url = require('url');
var websocket = require('ws');
module.exports = function (server) {
    var router = new websocket.Server({ server: server });
    router.on('connection', function (socket) {
        var arg = url.parse(socket.upgradeReq.url, true).query;
        console.log(arg);
        if (global.connectList[arg.room] == null)
            global.connectList[arg.room] = [];
        global.connectList[arg.room].push(socket);
        console.log("now find the room:" + global.connectList[arg.room].length);
        socket.liveRoom = 'liveRoom';
        socket.on('close', function (code, message) {
            var index = global.connectList[arg.room].indexOf(socket);
            if (index > 0) {
                global.connectList[arg.room].splice(index, 1);
                console.log("删除房间成功");
            }
        });
    });
    router.broadcast = function (data, objectId) {
        // socketServer.clients.forEach(function each(client) {
        //   if (client.readyState == WebSocket.OPEN) {
        //     console.log(client.liveRoom);
        //     client.send(data);
        //   }
        // });
        if (global.connectList[objectId] == null) {
            global.connectList[objectId] = [];
        }
        global.connectList[objectId].forEach(function each(client) {
            if (client.readyState == websocket.OPEN) {
                client.send(data);
            }
        })
    };
    return router;
}