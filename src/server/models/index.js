import _ from 'lodash'

//temp
import chai from 'chai'
const assert = chai.assert


export class Games {
    constructor(games = [], players = []) {
        this.games = games
        this.players = players
    }

    getGameByBoardName = (boardName) => {
        return _.find(this.games, {boardName: boardName})
    }

    getPlayerByName = (playerName) => {
        return _.find(this.players, {playerName: playerName})
    }

    getPlayerBySocketId = (socketId) => {
        return _.find(this.players, {socketId})
    }

    newGame = (boardName, playerName) => {
        if (!this.getPlayerByName(playerName)) throw new Error('player not instantiated')
        if (this.getGameByBoardName(boardName)) throw new Error('game already instantiated')
        const gameInstance = new Game(boardName, playerName)
        this.games.push(gameInstance)
    }

    newPlayer = (playerName, socketId) => {
        const player = new Player(playerName, socketId)
        this.players.push(player)
    }

    isPlayerInGame = (playerName, boardName) => {
        const player = this.getPlayerByName(playerName)
        return player.currentBoardName === boardName
    }

    addPlayerToGame = (playerName, boardName) => {
        if (!this.getPlayerByName(playerName)) throw new Error('player not instantiated.')
        if (!this.getGameByBoardName(boardName)) throw new Error('game not instantiated.')

        const gameInstance = this.getGameByBoardName(boardName)
        const player = this.getPlayerByName(playerName)

        player.setCurrentGame(boardName)
        if (!gameInstance.playerNames.includes(playerName)) gameInstance.addPlayer(playerName)
    }

    deletePlayer = (playerName) => {
        this.players = this.players.filter(player => player.playerName !== playerName)
    }

    disconnectPlayerFromGame = (playerName, boardName) => {
    	const gameInstance = this.getGameByBoardName(boardName)
        const player = this.getPlayerByName(playerName)
	    gameInstance.disconnectPlayer(playerName)
	    player.setCurrentGame('')
    }

    removeGame = boardName => this.games = this.games.filter(game => game.boardName !== boardName)
}

class PlayerModel {
	constructor(playerName = null, socketId = null) {
		if (!socketId || !playerName) throw new Error('Player has no socket ID or playerName.')
		this.id = _.uniqueId()
		this.playerName = playerName
		this.socketId = socketId
		this.currentBoardName = null
		this.isPlaying = false
	}
}

export class Player extends PlayerModel {
	constructor(playerName, socketId) {
		super(playerName, socketId)
	}

	setCurrentGame = boardName => this.currentBoardName = boardName
}

class GameModel {
	constructor(boardName = null, leadPlayerName) {
		this.boardName = boardName
		this.leadPlayerName = leadPlayerName //player who inits game
		this.playerNames = [leadPlayerName]
		this.pieceLineUp = []
		this.hasStarted = false
		this.hasEnded = false
		this.winnerName = ''
		this.startError = null
	}
}

export class Game extends GameModel {
	constructor(boardName, leadPlayerName) {
		super(boardName, leadPlayerName)
	}

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

	addPlayer = (playerName) => {
		if (!this.hasStarted && !this.hasEnded) {
			if (this.playerNames.includes(playerName)) throw new Error('player already in game.')
			this.playerNames = [...this.playerNames, playerName]
		}
	}

	changeLeader = (playerIndex) => {
	    this.leadPlayerName = this.playerNames[playerIndex] || ''
    }

	disconnectPlayer = (playerToRemoveName) => {
		assert(this.playerNames.includes(playerToRemoveName), 'player already removed from game.')
		if (playerToRemoveName === this.leadPlayerName) {
            const playerIndex = this.playerNames.indexOf(playerToRemoveName)
            this.changeLeader(playerIndex)
        }
        this.playerNames = this.playerNames.filter(playerName => playerName !== playerToRemoveName)
    }
}

class PieceModel {
	// define constants for pieces
}

class Piece {
	static randomPiece = () => {
		// return new Piece(randomXaxisStartPosition, randomShape, randomColor, randomRotation)
	}
}