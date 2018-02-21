import React from 'react'
import './gameMeta.scss'

const GameMeta = ({readyGames, inProgressGames}) => {
	return (
		<div className={'gameMeta'}>
			<div><span className={'info'}>Rooms waiting to start: <span className={'dynamicInfo'}>{readyGames}</span></span></div>
			<div><span className={'info'}>&nbsp;/&nbsp;<span className={'dynamicInfo'}>{inProgressGames.length}</span> games in progress</span></div>
		</div>
	)
}

export default GameMeta