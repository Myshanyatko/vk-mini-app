import React from 'react';
import logo from '../img/logoMiniApp.png';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id} >
		<PanelHeader>Отгадай, чей статус</PanelHeader>
		<p className='homeDescription'>Проверим, как хорошо ты знаешь своих друзей?<br /> В этом мини-приложении нужно отгадывать, кому из твоих друзей вконтакте принадлежит статус.</p>

		<Group >
			<Div className='home'>
				<img src={logo}></img>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="whoseStatus">
					Погнали!
				</Button>
			</Div>
		</Group>
	</Panel>
);


export default Home;
