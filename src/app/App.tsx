import { ConfigProvider, ConfigProviderProps, theme } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PlantPage } from '@/pages/plant/ui';
import { PlantsPage } from '@/pages/plants/ui';
import { TypePlantsPage } from '@/pages/typePlants/ui';
import { cn } from '@/shared/lib';
import { ToastProvider } from '@/shared/utils';
import { Navbar } from '@/widgets/navbar/ui';

import './App.css';

type Locale = ConfigProviderProps['locale'];

export const App = () => {
	const locale: Locale = ruRu;

	return (
		<div id='app'>
			<Helmet></Helmet>

			<ConfigProvider
				locale={locale}
				theme={{ algorithm: theme.darkAlgorithm }}
			>
				<ToastProvider>
					<BrowserRouter basename='/'>
						<Navbar />
						<div
							className={cn(
								'flex flex-col height-[calc(100vh - 46px)] overflow-y-auto',
							)}
						>
							<Routes>
								<Route
									path='/plants'
									element={<PlantsPage />}
								/>
								<Route
									path='/plants/:id'
									element={<PlantPage />}
								/>
								<Route
									path='/type_plants'
									element={<TypePlantsPage />}
								/>
							</Routes>
						</div>
					</BrowserRouter>
				</ToastProvider>
			</ConfigProvider>
		</div>
	);
};
