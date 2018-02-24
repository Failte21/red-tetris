import _ from 'lodash'

class PlayerModel {
    constructor(playerName = null, socketId = null) {
        if (!socketId || !playerName) throw new Error('Player has no socket ID or playerName.')
        this.id = _.uniqueId()
        this.playerName = playerName
        this.socketId = socketId
        this.currentRoomName = null
        this.isPlaying = false
    }
}

export class Player extends PlayerModel {
    constructor(playerName, socketId) {
        super(playerName, socketId)
    }

    setCurrentGame = roomName => this.currentRoomName = roomName
}
