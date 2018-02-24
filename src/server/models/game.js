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
        // this.pieceLineUp = Array.from(new Array(100), Piece.randomPiece())
    }

    startGame = () => {
        // this.generatePieceList()
        // this.playerIdsInGame = _.map(this.players, 'id')
        // this.hasStarted = true
    }

    endGame = () => {
        // this.hasEnded = true
        // this.winner = _.find(this.players, { 'id' : this.playerIdsInGame[0].id })
    }

    hasPlayer = playerName => !!this.playerNames.find(name => name === playerName)

    addPlayer = (player) => {
        //Todo: do we keep class functions as simple as possible and do the checkings in the controllers ?
        // if (!this.hasStarted && !this.hasEnded) {
        // 	if (this.playerNames.includes(playerName)) throw new Error('player already in game.')
        //    const player = new Player(playerName, 1)
        //    this.players = [...this.players, player]
        // 	this.playerNames = [...this.playerNames, playerName]
        // }
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