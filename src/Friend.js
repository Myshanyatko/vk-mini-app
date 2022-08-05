import React, { useState} from 'react';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Friend = (props) => {
	const [result, setResult] = useState('neutral');
	const selectedFriend = () => {
		if (props.right){
			setResult('correct')
		}
		else{setResult('incorrect')}
		props.setPressed(true)
	}
	

	return(
		<Button stretched size="l" mode="secondary" onClick={()=>selectedFriend()} className={'friend '+result} disabled={props.pressed}>
					<img src={props.imageSrc}></img>
			<p>{props.name}</p>
		</Button>
		
	)
}

export default Friend;
