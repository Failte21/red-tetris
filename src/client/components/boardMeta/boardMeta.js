import React from 'react'
import './boardMeta.scss'

const BoardMeta = ({boardName, playerName, isPlaying}) => {
	return (
		<div className={'boardMeta'}>
			<h4 className={"playerName " + (isPlaying ? 'activePlayer' : 'inactivePlayer')}>@{playerName} playing in room #{boardName}</h4>
		</div>
	)
}

export default BoardMeta