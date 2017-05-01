var express = require('express');
var url = require('url');
var websocket = require('ws');
module.exports = function (server) {
    var router = new websocket.Server({ server: server });
    router.on('connection', function (socket) {
        var arg = url.parse(socket.upgradeReq.url, true).query;
        console.log(arg);
        if (global.connectList[arg.id] == null)
            global.connectList[arg.id] = [];
        global.connectList[arg.id].push(socket);
        console.log("now find the room:" + global.connectList[arg.id].length);
        socket.liveRoom = 'liveRoom';
        socket.on('close', function (code, message) {
            var index = global.connectList[arg.id].indexOf(socket);
            if (index > 0) {
                global.connectList[arg.id].splice(index, 1);
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