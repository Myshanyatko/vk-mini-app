import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const Friend = (props) => {
	return(
		<div onClick={()=>props.selectedFriend(props.id)}>
			<img src={props.imageSrc}></img>
			<p>{props.name}</p>
			{/* <p>{props.status}</p> */}
		</div>
	)
}

export default Friend;
