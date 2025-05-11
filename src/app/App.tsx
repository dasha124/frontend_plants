import { ConfigProvider, ConfigProviderProps, theme } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CollectionPage } from '@/pages/collection/ui';
import { CollectionsPage } from '@/pages/collections/ui';
import { DetectPage } from '@/pages/detect/ui';
import { LoginPage } from '@/pages/login/ui';
import { MainPage } from '@/pages/main/ui';
import { PlantPage } from '@/pages/plant/ui';
import { PlantsPage } from '@/pages/plants/ui';
import { SignupPage } from '@/pages/signup/ui';
import { TypePlantsPage } from '@/pages/typePlants/ui';
import { EnvProvider } from '@/shared/contexts';
import { cn } from '@/shared/lib';
import { store } from '@/shared/model/store';
import { ToastProvider, BeforeRender } from '@/shared/utils';
import { ModalContainer } from '@/widgets/modal/container';
import { Navbar } from '@/widgets/navbar/ui';
import './App.css';

type Locale = ConfigProviderProps['locale'];

export const App = () => {
	const locale: Locale = ruRu;

	return (
		<div id='app'>
			<Provider store={store}>
				<EnvProvider>
					<ConfigProvider
						locale={locale}
						theme={{ algorithm: theme.darkAlgorithm }}
					>
						<BeforeRender>
							<ToastProvider>
								<BrowserRouter basename='/'>
									<Navbar />

									<div
										style={{
											marginTop: 'calc(46px + 1rem)',
											marginBottom: '1rem',
										}}
										className={cn('flex flex-col mb-4 text-white')}
									>
										<Routes>
											<Route
												path='/'
												element={<MainPage />}
											/>
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
											<Route
												path='/detect'
												element={<DetectPage />}
											/>
											<Route
												path='/collections'
												element={<CollectionsPage />}
											/>
											<Route
												path='/collections/:id'
												element={<CollectionPage />}
											/>
											<Route
												path='/login'
												element={<LoginPage />}
											/>
											<Route
												path='/signup'
												element={<SignupPage />}
											/>
										</Routes>
									</div>

									<ModalContainer />
								</BrowserRouter>
							</ToastProvider>
						</BeforeRender>
					</ConfigProvider>
				</EnvProvider>
			</Provider>
		</div>
	);
};
