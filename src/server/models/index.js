import _ from 'lodash'

class PlayerModel {
	constructor(name = null, socketId = null) {
		if (!socketId) throw new Error('Player has no socket ID.')
		this.id = _.uniqueId()
		this.name = name ? name : 'Player_' + this.id
		this.socketId = socketId
		this.roomId = null
		this.isPlaying = false
	}
}

export class Player extends PlayerModel {
	constructor(name, socketId) {
		super(name, socketId)
	}

	addPlayerToRoom = (roomId) => {
		// this.roomId = roomId
	}

	startPlaying = () => {
		// this.isPlaying = true
	}

	loseGame = () => {
		// emit some message about losing
		// this.roomId = null
		// this.inGame = false
	}
}

class GameModel {
	constructor(roomId = null, leadPlayer) {
		this.roomId = roomId
		this.leadPlayer = leadPlayer //player who inits game
		this.players = [leadPlayer]
		this.playerIdsInGame = []
		this.pieceLineUp = []
		this.hasStarted = false
		this.hasEnded = false
		this.winner = null
	}
}

export class Game extends GameModel {
	constructor(roomId, leadPlayer) {
		super(roomId, leadPlayer)
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

	addPlayer = (player) => {
		// if (!this.hasStarted && !this.hasEnded) {
		// 	this.players = [...this.players, player]
		// }
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