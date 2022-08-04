import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Friend = (props) => {
	const [result, setResult] = useState('neutral');
	const selectedFriend = () => {
		
		if (props.right){
			setResult('correct')
		}
		else(setResult('incorrect'))
		props.setPressed(true)
		console.log(result)
	}
	

	return(
		<Button stretched size="l" mode="secondary" onClick={()=>selectedFriend()} className={result} disabled={props.pressed}>
					<img src={props.imageSrc}></img>
			<p>{props.name}</p>
		</Button>
		
	)
}

export default Friend;
