import * as pieceController from "../controllers/pieceController";
import assert from 'assert'

class GameModel {
    constructor(roomName = null, player) {
        this.roomName = roomName
        this.leadPlayerName = player.playerName //player who inits game
        this.playerNames = [player.playerName]
        this.players = [player]
        this.pieceLineUp = []
        this.isInProgress = false
        this.winnerName = ''
        this.isSinglePlayer = true
    }
}

// this.spectres = [{playerName: player.playerName, spectreData: player.spectre}]
export class Game extends GameModel {
    constructor(roomName, player) {
        super(roomName, player)
    }

    disconnectPlayer = (socketId) => {
        const player = this.getPlayerBySocketId(socketId)
        assert(player, 'trying to disconnect nonexistent player')
        this._disconnectPlayer(player.playerName)
        return this
    }

    addPlayer = (player) => {
        this.playerNames = [...this.playerNames, player.playerName]
        this.players = [...this.players, player]
        this.setIsSinglePlayer()
        return this
    }

    startGame = () => {
        this.addToPieceLineup()
        this.isInProgress = true
        this.setIsSinglePlayer()
        return this
    }

    endGame = () => {
        this.isInProgress = false
        this.pieceLineUp = []
        return this
    }

    addToPieceLineup = () => {
        this.pieceLineUp = [...this.pieceLineUp, ...pieceController.generatePieceList(10)]
    }

    _disconnectPlayer = (playerToRemoveName) => {
        this.players = this.players.filter(player => player.playerName !== playerToRemoveName)
        this.playerNames = this.playerNames.filter(playerName => playerName !== playerToRemoveName)
        this.leadPlayerName = this.playerNames[0] || ''
        this.setIsSinglePlayer()
    }

    setIsSinglePlayer = () => this.isSinglePlayer = this.playerNames.length === 1

    get hasPlayers() {
        return this.playerNames.length
    }
    // getSpectreBySocketId = (socketId) => this.players.find(player => player[socketId] === socketId)
    getPlayer = (field, value) => this.players.find(player => player[field] === value)
    getPlayerByName = (playerName) => this.getPlayer('playerName', playerName)
    getPlayerBySocketId = (socketId) => this.getPlayer('socketId', socketId)
    hasPlayer = playerName => !!this.playerNames.find(name => name === playerName)
}