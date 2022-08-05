import React, { useState, useEffect } from 'react';
import Friend from './Friend';
import { Button, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
const ListFriends = props => {
	const [pressed, setPressed] = useState(false)

	const goFriends = (e) => {
		props.go(e)
		setPressed(false)
		props.setGoFriend(prevState => !prevState)
	}
	const friendsMap = props.friends.map(friend => <Friend
		key={friend.id}
		imageSrc={friend.photo_100}
		name={friend.first_name + ' ' + friend.last_name}
		status={friend.status}
		id={friend.id}
		right={props.randomFriend1.id == friend.id ? true : false}
		pressed={pressed}
		setPressed={setPressed}
	/>)

	return (
		<div className='listFriends'>
			<div className='friends' >
				{friendsMap}
			</div>
			<Button stretched size="l" mode="secondary" onClick={(e) => goFriends(e)} data-to="whoseStatus" disabled={!pressed} >
				Далее
			</Button>
		</div>
	)
}

export default ListFriends;
