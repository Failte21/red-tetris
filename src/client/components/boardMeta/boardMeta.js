import React from 'react'
import './boardMeta.scss'

const BoardMeta = ({roomName, playerName, isPlaying, hasStarted, leadPlayerName}) => {
	return (
		<div className={'boardMeta'}>
			<h4 className={"boardMetaText " + (isPlaying ? 'active' : 'inactive')}>
                @{playerName} playing in room #{roomName}
                <span>&nbsp;(leader{(playerName !== leadPlayerName) && `: ${leadPlayerName}`})</span>
                </h4>
			<h4 className={"boardMetaText " + (hasStarted ? 'active' : 'inactive')}>Game has {hasStarted ? '' : 'not'} started.</h4>
		</div>
	)
}

export default BoardMeta