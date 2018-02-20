import _ from 'lodash'

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

	newGame = (boardName, playerName, socketId) => {
		if (!this.getPlayerByName(playerName)) this.newPlayer(playerName, socketId)
		const gameInstance = new Game(boardName, playerName)
		this.games.push(gameInstance)
	}

	newPlayer = (playerName, socketId) => {
		console.log(playerName, socketId)
		const player = new Player(playerName, socketId)
		this.players.push(player)
	}

	isPlayerInGame = (playerName, boardName) => {
		const player = this.getPlayerByName(playerName)
		return player.boardName === boardName
	}

	returnPlayerFromGame = (playerName, boardName) => {
		const isInGame = this.isPlayerInGame(playerName, boardName)
		return isInGame ? this.getPlayerByName(playerName) : null
	}

	addPlayerToGame = (playerName, boardName) => {
		if (!this.getPlayerByName(playerName)) throw new Error('player not instantiated.')
		if (!this.getGameByBoardName(boardName)) throw new Error('game not instantiated.')

		const gameInstance = this.getGameByBoardName(boardName)
		if (!this.isPlayerInGame(playerName, boardName)) {
			this.getPlayerByName(playerName).boardName = boardName
			gameInstance.addPlayer(playerName)
		}
	}
}

class PlayerModel {
	constructor(playerName = null, socketId = null) {
		if (!socketId || !playerName) throw new Error('Player has no socket ID or playerName.')
		this.id = _.uniqueId()
		this.playerName = playerName
		this.socketId = socketId
		this.boardName = null
		this.isPlaying = false
	}
}

export class Player extends PlayerModel {
	constructor(playerName, socketId) {
		super(playerName, socketId)
	}

	addPlayerToRoom = (boardName) => {
		// this.boardName = boardName
	}

	startPlaying = () => {
		// this.isPlaying = true
	}

	loseGame = () => {
		// emit some message about losing
		// this.boardName = null
		// this.inGame = false
	}
}

class GameModel {
	constructor(boardName = null, leadPlayerName) {
		this.boardName = boardName
		this.leadPlayerName = leadPlayerName //player who inits game
		this.playerNames = [leadPlayerName]
		this.playerNamesStillInGame = []
		this.pieceLineUp = []
		this.hasStarted = false
		this.hasEnded = false
		this.winner = null
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

	addPlayer = (playerName, boardName) => {
		if (!this.hasStarted && !this.hasEnded) {
			this.playerNames = [...this.playerNames, playerName]
		}
	}

	bootPlayer = (playerId) => {
		//this.playerIdsInGame = this.players.filter(p => p.id !== playerId)
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