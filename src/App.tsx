import { ConfigProvider, ConfigProviderProps } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Main } from '@/app/Main.tsx';

type Locale = ConfigProviderProps['locale'];

function App() {
	const locale: Locale = ruRu;

	return (
		<div id='app'>
			<Helmet></Helmet>

			<ConfigProvider locale={locale}>
				<BrowserRouter basename='/'>
					<Routes>
						<Route
							path='/'
							element={<Main />}
						/>
					</Routes>
				</BrowserRouter>
			</ConfigProvider>
		</div>
	);
}

export default App;
