import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Friend = (props) => {
	const [result, setResult] = useState('neutral');
	const selectedFriend = (id) => {
		
		if (id ==props.random) {
			setResult('correct')
			console.log(result)
		}

		else {
			console.log(result)
		setResult('incorrect')}
	
	}
	

	return(
		<div onClick={()=>selectedFriend(props.id)} className={result} >
			<img src={props.imageSrc}></img>
			<p>{props.name}</p>
			{/* <p>{props.status}</p> */}
		</div>
	)
}

export default Friend;
