import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Friend from './Friend';
import Home from './panels/Home';
import Persik from './panels/Persik';
import WhoseStatus from './WhoseStatus';

const App = () => {
	const token = 'vk1.a.596EnM5XBnbKzXIEQWfNDjFAUugwJ23KxKzMlsqcIT-K1YTf_HXaFHWaKBXN4y2EvJmkTwFhCkY5_s9UU31LhTy6X3tuD-0I0T9Tq6mEGx5LrbNU7gyi_k36W-jyE2VEWw7kwOFqUBeYy2fMZqCQakacgtgOKBhGDajNB-OzHSSxYpKVUuK_BdxTNKUoCbfv'
	const id = 8229881
	bridge.send("VKWebAppInit");

	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedFriends, setFriends] = useState([]);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const fields = 'status,photo_100'
	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const userToken = await bridge.send("VKWebAppGetAuthToken", {
				"app_id": id,
				"scope": "friends,status"
			});
			const dataFriends = await bridge.send('VKWebAppCallAPIMethod', {
				"method": "friends.get",
				"request_id": "friends",
				"params": { "order": "name", "v": '5.131', "access_token": userToken.access_token, "fields": fields }
			})
			setFriends(dataFriends.response.items);
			console.log('fetchfriends'	)
			console.log(fetchedFriends)
			setPopout(null)
		}
		fetchData();
	}, []);
	// const status = fetchedFriends.filter(status => status.status != '')
	
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		// setRandom(randoms)
		// friendsCreateArray()
	};
	// var rightNumber = 0
	// const createRandomArray = () =>{
		
	// 	rightNumber = parseInt(Math.random() * (status.length))
	// 	console.log(rightNumber)
	// 	// setRandom([rightNumber, 0, 0])
	// 	// setRandom([ rightNumber, parseInt(Math.random() * (fetchedFriends.length)), parseInt(Math.random() * (fetchedFriends.length))])
	// 	var randoms = [{'right': true,'value': rightNumber}, {'right': false,'value': 0}, {'right': false,'value': 0}]
	// console.log(randoms)
	// randoms[1].value = 	parseInt(Math.random() * (fetchedFriends.length))
	// randoms[2].value = 	parseInt(Math.random() * (fetchedFriends.length))
	// 	function searchForIdentical(array) {
	// 		while(status[array[0].value] == fetchedFriends[array[1].value]  || fetchedFriends[array[1].value] == fetchedFriends[array[2].value] || status[array[0].value] == fetchedFriends[array[2].value]){
	// 			array[1].value=parseInt(Math.random() * (fetchedFriends.length))
	// 			array[2].value=parseInt(Math.random() * (fetchedFriends.length))
	// 		}
	// 	}
		// searchForIdentical(randoms)
		// fetchedFriends.forEach(element => {
		// 	if (element.key === status[rightNumber].key) {
		// 		randoms[0]=
		// 		listFriends.push(element)
		// 	}})
		// function shuffleArray(array) {
		// 	for (var i = array.length - 1; i > 0; i--) {
		// 		var j = Math.floor(Math.random() * (i + 1));
		// 		var temp = array[i];
		// 		array[i] = array[j];
		// 		array[j] = temp;
		// 	}
		// }
		// shuffleArray(randoms)
		
		
	// 	return randoms
	// }
	// const randoms = createRandomArray()
	// const friendsCreateArray = () =>{
	// 	const FriendsWithStatus = fetchedFriends.filter(status => status.status != '')
	// // const status = fetchedFriends.filter(element => element.status != '')
	// console.log(FriendsWithStatus)
	// var random = parseInt(Math.random()*(FriendsWithStatus.length))
	// console.log('random='+random)
	// const randomFriend1 = FriendsWithStatus[random] //выбираем первого друга
	// console.log(randomFriend1)
	// var statusFriend = randomFriend1.id
	// const randomFriend2 = randomFriend1
	// while (randomFriend1.key == randomFriend2.key){
	// 	randomFriend2 = fetchedFriends[Math.random()*fetchedFriends.length]
	// }
	// const randomFriend3 = randomFriend2
	// while (randomFriend3.key == randomFriend2.key || randomFriend3.key == randomFriend1.key){
	// 	randomFriend3 = fetchedFriends[Math.random()*fetchedFriends.length]
	// }
	// const friends = [randomFriend1, randomFriend2, randomFriend3]
	// const friendsMap = friends.map(friend => 	<Friend
	// 			key={friend.id}
	// 			imageSrc={friend.photo_100}
	// 			name={friend.first_name + ' ' + friend.last_name}
	// 			status={friend.status}
	// 			id={friend.id} 
	// 			right={randomFriend1.key==friend.key ? true : false}/>)
	// // 	return (friendsMap)
	// // }
	

	return (<ConfigProvider scheme={scheme}>
		<AdaptivityProvider>
			<AppRoot>
				<SplitLayout popout={popout}>
					<SplitCol>
						<View activePanel={activePanel}>
							<Home id='home'go={go} />
							<Persik id='persik' go={go} />
							{/* <WhoseStatus id='whoseStatus' /> */}
							<WhoseStatus id='whoseStatus' friends={fetchedFriends} go={go} />
						</View>
					</SplitCol>
				</SplitLayout>
			</AppRoot>
		</AdaptivityProvider>
	</ConfigProvider>)
}

export default App;
