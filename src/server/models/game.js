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

// this.spectres = [{playerName: player.playerName, spectreData: player.spectre}]
export class Game extends GameModel {
    constructor(roomName, leadPlayerName) {
        super(roomName, leadPlayerName)
    }

    getPlayer = (field, value) => this.players.find(player => player[field] === value)

    // getSpectreBySocketId = (socketId) => this.players.find(player => player[socketId] === socketId)

    // getPlayerByName = (playerName) => this.getPlayer('playerName', playerName)

    getPlayerBySocketId = (socketId) => this.getPlayer('socketId', socketId)

    addToPieceLineup = (lineUp) => {
        this.pieceLineUp = [...lineUp]
    }

    startGame = () => {
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
        this.players = this.players.filter(player => player.playerName !== playerToRemoveName)
        this.playerNames = this.playerNames.filter(playerName => playerName !== playerToRemoveName)
    }
}