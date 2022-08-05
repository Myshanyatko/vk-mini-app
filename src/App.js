import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/Persik.css';
import Home from './panels/Home';
import WhoseStatus from './WhoseStatus';

const App = () => {
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
	}, [])
	
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	
	return (<ConfigProvider scheme={scheme}>
		<AdaptivityProvider>
			<AppRoot>
				<SplitLayout popout={popout}>
					<SplitCol>
						<View activePanel={activePanel}>
							<Home id='home'go={go} />
							<WhoseStatus id='whoseStatus' friends={fetchedFriends} go={go} />
						</View>
					</SplitCol>
				</SplitLayout>
			</AppRoot>
		</AdaptivityProvider>
	</ConfigProvider>)
}

export default App;
