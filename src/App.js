import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Friend from './Friend';
import Home from './panels/Home';
import Persik from './panels/Persik';

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
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const selectedFriend = (id) => {
		if (id == status[random].key) {
			console.log('correct')
		}
		
		else {
		console.log('incorrect')}
	}
	// if (fetchedFriends){
	const friends = fetchedFriends.map(friend => <Friend selectedFriend={selectedFriend} key={friend.id} imageSrc={friend.photo_100} name={friend.first_name + ' ' + friend.last_name} status={friend.status} id={friend.id}/>)
	const status = fetchedFriends.filter(status => status.status != '').map(status => <p key={status.id}>{status.status}</p>)
	const random2 = parseInt(Math.random() * (friends.length - 0))
	const random3 = parseInt(Math.random() * (friends.length - 0))
	var random = 1
	const listFriends = [friends[random2], friends[random3]]
	random = parseInt(Math.random() * (status.length))

	friends.forEach(element => {
		if (element.key === status[random].key) {
			listFriends.push(element)
		}
	});
	
	function searchForIdentical(array) {
		while(array[0] == array[1] && array[1] == array[2] && array[0] == array[2]){
			array[0]= parseInt(Math.random() * (friends.length - 0))
			array[1]= parseInt(Math.random() * (friends.length - 0))
		}
			if(array[0]==array[1]){
				array[0]= parseInt(Math.random() * (friends.length - 0))
			}
		}
	searchForIdentical(listFriends)
	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	shuffleArray(listFriends)

	return (<div>
		<h1>Как хорошо ты знаешь своих друзей?</h1>
		<h3>Чей это статус?</h3>
		{status[random] ? status[random] : 'null'}
		<div>
			{listFriends}
		</div>

	</div>)
}

export default App;
