import React, { createContext, useContext, ReactNode } from 'react';

interface IEnvConfig {
	isDebugMode: boolean;
}

const EnvContext = createContext<IEnvConfig | undefined>(undefined);

interface IEnvProviderProps {
	children: ReactNode;
}

export const EnvProvider: React.FC<IEnvProviderProps> = ({ children }) => {
	const isDebugMode = import.meta.env.VITE_IS_DEBUG_MODE === 'true';

	if (!isDebugMode) {
		throw new Error(
			'VITE_IS_DEBUG_MODE is not defined in the environment variables',
		);
	}

	const envConfig: IEnvConfig = {
		isDebugMode,
	};

	return (
		<EnvContext.Provider value={envConfig}>{children}</EnvContext.Provider>
	);
};

export const useEnv = (): IEnvConfig => {
	const context = useContext(EnvContext);
	if (context === undefined) {
		throw new Error('useEnv must be used within an EnvProvider');
	}
	return context;
};
