import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Friend from './Friend';
import { Panel, PanelHeader, PanelHeaderBack, Button } from '@vkontakte/vkui';
import ListFriends from './ListFriends'
import '@vkontakte/vkui/dist/vkui.css';
import { element } from 'prop-types';
const WhoseStatus = props => {
	const [goFriend, setGoFriend] = useState(false)
	// const status = props.fetchedFriends.filter(status => status.status != '').map(status => <p key={status.id}>{status.status}</p>)
	// const friendsFilter = props.fetchedFriends.filter()
	// const friends = props.fetchedFriends.map(friend =>
	// 	<Friend
	// 		goFriend={goFriend}
	// 		setGoFriend={setGoFriend}
	// 		random={status[props.rightNumber].key}
	// 		key={friend.id}
	// 		imageSrc={friend.photo_100}
	// 		name={friend.first_name + ' ' + friend.last_name}
	// 		status={friend.status}
	// 		id={friend.id} />)

	// const listFriends = [friends[props.randoms[2].value], friends[props.randoms[1].value], friends[props.randoms[0].value]]
	// friends.forEach(element => {
	// 	if (element.key === status[props.rightNumber].key) {
	// 		listFriends.push(element)
	// 	}
	// });
	// listFriends.forEach(element =>{
	// 	if (element.value){
	// 		rightNumber = 
	// 	}
	// })
	// useEffect(() => {
	// 	console.log("I have been mounted")
	// }, [shuffleArray(listFriends)]);

	const goFriends = (e) => {
		
		props.go(e)
		// setGoFriend(false)

	}
	const FriendsWithStatus = props.friends.filter(status => status.status != '')
	const randomFriend1 = FriendsWithStatus[parseInt(Math.random() * (FriendsWithStatus.length))] //выбираем первого друга
	var statusFriend = randomFriend1.status

	var randomFriend2 = props.friends[parseInt(Math.random() * props.friends.length)]
	while (randomFriend1.id == randomFriend2.id) {
		randomFriend2 = props.friends[parseInt(Math.random() * props.friends.length)]
	}

	var randomFriend3 = props.friends[parseInt(Math.random() * props.friends.length)]
	while (randomFriend3.id == randomFriend2.id || randomFriend3.id == randomFriend1.id) {
		randomFriend3 = props.fetchedFriends[parseInt(Math.random() * fetchedFriends.length)]
	}

	const friends = [randomFriend1, randomFriend2, randomFriend3]
	// const friendsMap = friends.map(friend => <Friend
	// 	key={friend.id}
	// 	imageSrc={friend.photo_100}
	// 	name={friend.first_name + ' ' + friend.last_name}
	// 	status={friend.status}
	// 	id={friend.id}
	// 	right={randomFriend1.id == friend.id ? true : false} 
	// 	goFriend={goFriend}
	// 	setGoFriend={setGoFriend}/>)
	function shuffleArray(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
		shuffleArray(friends)
		return <Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={props.go} data-to="home" />}
			>
				Как хорошо ты знаешь своих друзей?
			</PanelHeader>
			<div>
				<h3>Чей это статус?</h3>
				{statusFriend ? statusFriend : 'null'}
				
				{/* {friendsMap} */}
				<div className='friends' >
					<ListFriends friends={friends} randomFriend1={randomFriend1} goFriend={goFriend} setGoFriend={setGoFriend}/>
				</div>

				<Button stretched size="l" mode="secondary" onClick={(e) => goFriends(e)} data-to="whoseStatus">
					next
				</Button>

			</div>
		</Panel>


	}

	export default WhoseStatus;
