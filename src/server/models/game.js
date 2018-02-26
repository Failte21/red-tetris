import {TETROS} from "../../common/game";

class GameModel {
    constructor(roomName = null, player) {
        this.roomName = roomName
        this.leadPlayerName = player.playerName //player who inits game
        this.playerNames = [player.playerName]
        this.players = [player]
        this.pieceLineUp = []
        this.hasStarted = false
        this.hasEnded = false
        this.winnerName = ''
        this.startError = null
    }
}

export class Game extends GameModel {
    constructor(roomName, leadPlayerName) {
        super(roomName, leadPlayerName)
    }

    getPlayer = (field, value) => this.players.find(player => player[field] === value)

    getPlayerByName = (playerName) => this.getPlayer('playerName', playerName)
    getPlayerBySocketId = (socketId) => this.getPlayer('socketId', socketId)

    generatePieceList = () => {
        const randomIndex = () => TETROS.SHAPES.length
        this.pieceLineUp = _.fill(new Array(10), randomIndex() )
    }

    startGame = () => {
        this.generatePieceList()
        this.hasStarted = true
    }

    endGame = () => {
        this.hasEnded = true
        this.pieceLineUp = []
    }

    hasPlayer = playerName => !!this.playerNames.find(name => name === playerName)

    addPlayer = (player) => {
        this.playerNames = [...this.playerNames, player.playerName]
        this.players = [...this.players, player]
    }

    changeLeader = (playerIndex) => {
        this.leadPlayerName = this.playerNames[playerIndex] || ''
    }

    disconnectPlayer = (playerToRemoveName) => {
        //Todo: do we keep class functions as simple as possible and do the checkings in the controllers ?
        // assert(this.playerNames.includes(playerToRemoveName), 'player already removed from game.')
        // if (playerToRemoveName === this.leadPlayerName) {
        //     const playerIndex = this.playerNames.indexOf(playerToRemoveName)
        //     this.changeLeader(playerIndex)
        // }
        this.players = this.players.filter(player => player.playerName !== playerToRemoveName)
        this.playerNames = this.playerNames.filter(playerName => playerName !== playerToRemoveName)
    }
}