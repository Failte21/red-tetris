import {TETROS} from "../../common/game";
import Board from "../../client/components/board/board";
import {BoardModel} from "./board";

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
        this.boards = [] // should be easier to control than from individual player instances
    }
}

export class Game extends GameModel {
    constructor(roomName, leadPlayerName) {
        super(roomName, leadPlayerName)
    }

    getPlayer = (field, value) => this.players.find(player => player[field] === value)
    getBoard = (field, value) => this.boards.find(board => board[field] === value)

    getPlayerByName = (playerName) => this.getPlayer('playerName', playerName)
    getPlayerBySocketId = (socketId) => this.getPlayer('socketId', socketId)

    addToPieceLineup = (lineUp) => {
        this.pieceLineUp = [...lineUp]
        // this.pieceLineUp = [...this.pieceLineUp, ...lineUp]
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
        this.boards.pushs(new BoardModel(player.playerName, player.socketId))
    }

    changeLeader = (playerIndex) => {
        this.leadPlayerName = this.playerNames[playerIndex] || ''
    }

    disconnectPlayer = (playerToRemoveName) => {
        this.players = this.players.filter(player => player.playerName !== playerToRemoveName)
        this.playerNames = this.playerNames.filter(playerName => playerName !== playerToRemoveName)
        this.boards = this.boards.filter(board => board.playerName !== playerToRemoveName)
    }
}