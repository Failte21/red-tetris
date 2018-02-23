import React from 'react'
import './boardMeta.scss'

const BoardMeta = ({roomName, playerName, isPlaying}) => {
	return (
		<div className={'boardMeta'}>
			<h4 className={"playerName " + (isPlaying ? 'activePlayer' : 'inactivePlayer')}>@{playerName} playing in room #{roomName}</h4>
		</div>
	)
}

export default BoardMeta