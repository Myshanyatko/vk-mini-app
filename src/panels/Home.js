import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Как хорошо ты знаешь своих друзей?</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group >
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="whoseStatus">
					Проверить
				</Button>
			</Div>
		</Group>
	</Panel>
);


export default Home;
