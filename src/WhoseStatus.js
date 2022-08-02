import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Friend from './Friend';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
const WhoseStatus = props => {
	const status = props.fetchedFriends.filter(status => status.status != '').map(status => <p key={status.id}>{status.status}</p>)
	var random = 1
	random = parseInt(Math.random() * (status.length))
	const friends = props.fetchedFriends.map(friend => <Friend random={status[random].key} key={friend.id} imageSrc={friend.photo_100} name={friend.first_name + ' ' + friend.last_name} status={friend.status} id={friend.id}/>)
	
	const random2 = parseInt(Math.random() * (friends.length - 0))
	const random3 = parseInt(Math.random() * (friends.length - 0))
	
	
	
	const listFriends = [friends[random2], friends[random3]]

	friends.forEach(element => {
		if (element.key === status[random].key) {
			listFriends.push(element)
		}
	});
	function searchForIdentical(array) {
		while(array[0] == array[1] || array[1] == array[2] || array[0] == array[2]){
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
	return <Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Как хорошо ты знаешь своих друзей?
		</PanelHeader>
		<div>
			<h3>Чей это статус?</h3>
			{status[random] ? status[random] : 'null'}
			<div className='friends'>
				{listFriends}
			</div>
			
			{/* {result==1 && <p className={'visiable'}>ответ правильный</p>}
			{result==2 && <p className={'disvisiable'}>ответ не правильный</p>} */}
			
		</div>
	</Panel>


}

export default WhoseStatus;
