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
			setPopout(null)
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	
	// if (fetchedFriends){
	

	
	
	
	
	return (<ConfigProvider scheme={scheme}>
		<AdaptivityProvider>
			<AppRoot>
				<SplitLayout popout={popout}>
					<SplitCol>
						<View activePanel={activePanel}>
							<Home id='home'go={go} />
							<Persik id='persik' go={go} />
							<WhoseStatus id='whoseStatus' fetchedFriends={fetchedFriends} go={go} />
						</View>
					</SplitCol>
				</SplitLayout>
			</AppRoot>
		</AdaptivityProvider>
	</ConfigProvider>)
}

export default App;
