import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Friend from './Friend';
import { Panel, PanelHeader, PanelHeaderBack, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
const ListFriends = props => {
	const [pressed, setPressed] = useState(false)
	const friendsMap = props.friends.map(friend => <Friend
		key={friend.id}
		imageSrc={friend.photo_100}
		name={friend.first_name + ' ' + friend.last_name}
		status={friend.status}
		id={friend.id}
		right={props.randomFriend1.id == friend.id ? true : false} 
		pressed={pressed}
		setPressed={setPressed}/>)
		// useEffect(() => {
			
				
			
				
		// 	}, [setPressed(false)]);
		
	return (<div >
		{friendsMap }
		</div>
	)
}

export default ListFriends;
