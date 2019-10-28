/**
 * @param https
 */
module.exports = (https) => {
    const io = require('socket.io')(https);
    let rooms = {};
    let roomId = null;
    let socketId = {};

    /**
     * socketId 방 탐색
     * @param value
     * @return {*}
     */
    function findRoomBySocketId(value) {
        const arr = Object.keys(rooms);
        let result = null;

        for(let i = 0; i < arr.length; ++i){
            if(rooms[arr[i]][value]){
                result = arr[i];
                break;
            }
        }

        return result;
    };

    io.on('connection', socket => {
        socket.on('enter', (RoomUrl, userId) => {
            roomId = RoomUrl;
            socket.join(roomId);
            if(rooms[roomId]){
                console.log('이미 룸이 생성된 경우');
                rooms[roomId][socket.id] = userId;
            } else{
                console.log('룸 추가');
                rooms[roomId] = {};
                rooms[roomId][socket.id] = userId;
            }
            thisRoom = rooms[roomId];
            console.log('thisRoom', thisRoom);
            
            io.sockets.in(roomId).emit('join', roomId, thisRoom, userId);
        });

        socket.on('sendMsg', data => {
            console.log(data);
            roomId = data.RoomUrl;
            socket.broadcast.to(roomId).emit('receive', data.id, data.msg);
        });

        socket.on('message', data => {            
            if(data.to === 'all'){
                socket.broadcast.to(data.RoomUrl).emit('message', data);
            }else {
                const targetSocketId = socketId[data.to];

                if(targetSocketId){
                    io.to(targetSocketId).emit('message', data);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected', socket.id);
            const roomId = findRoomBySocketId(socket.id);
            if(roomId){
                socket.broadcast.to(roomId).emit('leave', rooms[roomId][socket.id]);
                delete rooms[roomId][socket.id];
            }
        });
    });
};