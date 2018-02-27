import React from 'react'
import './boardMeta.scss'

const BoardMeta = ({roomName, playerName, isPlaying, isInProgress, leadPlayerName}) => {
	return (
		<div className={'boardMeta'}>
			<h4 className={"boardMetaText " + (isPlaying ? 'active' : 'inactive')}>
                @{playerName} playing in room #{roomName}
                <span>&nbsp;(leader{(playerName !== leadPlayerName) && `: ${leadPlayerName}`})</span>
                </h4>
			<h4 className={"boardMetaText " + (isInProgress ? 'active' : 'inactive')}>Game has {isInProgress ? '' : 'not'} started.</h4>
		</div>
	)
}

export default BoardMeta