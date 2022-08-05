import React, { useState} from 'react';
import { Div, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import ListFriends from './ListFriends'
import '@vkontakte/vkui/dist/vkui.css';
const WhoseStatus = props => {
	const [goFriend, setGoFriend] = useState(false)

	const FriendsWithStatus = props.friends.filter(status => status.status != '')
	const randomFriend1 = FriendsWithStatus[parseInt(Math.random() * (FriendsWithStatus.length))] //выбираем первого друга
	var statusFriend = randomFriend1.status

	var randomFriend2 = props.friends[parseInt(Math.random() * props.friends.length)]
	while (randomFriend1.id == randomFriend2.id) {
		randomFriend2 = props.friends[parseInt(Math.random() * props.friends.length)]
	}

	var randomFriend3 = props.friends[parseInt(Math.random() * props.friends.length)]
	while (randomFriend3.id == randomFriend2.id || randomFriend3.id == randomFriend1.id) {
		randomFriend3 = props.friends[parseInt(Math.random() * props.friends.length)]
	}

	const friends = [randomFriend1, randomFriend2, randomFriend3]

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	shuffleArray(friends)
	return <Panel id={props.id} >
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home" />}
		>
			Отгадай, чей статус
		</PanelHeader>
		<Div>
			<p className='status'>{statusFriend ? statusFriend : 'null'}</p>
			<Div >
				<ListFriends friends={friends} randomFriend1={randomFriend1} goFriend={goFriend} go={props.go} setGoFriend={setGoFriend} />
			</Div>
			</Div>
	</Panel>


}

export default WhoseStatus;
