import { ERequestMethods } from '@/shared/model/enums';
import { TServiceConfig } from '@/shared/model/types';

export abstract class ServiceBase {
	protected pendingRequests: { [key: string]: boolean } = {};
	protected config: TServiceConfig[] = [];

	protected getConfigItem(name: string): TServiceConfig {
		const configItem = this.config.find((item) => item.name === name);

		if (!configItem) {
			throw new Error(`Не найдена конфигурация для ${name}`);
		}

		return configItem;
	}

	// private getAccessToken(): string | null {
	// 	const match = document.cookie.match(/(?:^|;\s*)access=([^;]*)/);
	// 	return match ? decodeURIComponent(match[1]) : null;
	// }
	//
	// private isTokenExpiring(token: string): boolean {
	// 	try {
	// 		const payloadBase64 = token.split('.')[1];
	// 		const payload = JSON.parse(atob(payloadBase64));
	// 		const currentTime = Math.floor(Date.now() / 1000);
	// 		const expirationTime = payload.exp || 0;
	//
	// 		return expirationTime - currentTime < 10; // хотим чтобы время до истечение было более 10 секунд
	// 	} catch {
	// 		return true;
	// 	}
	// }
	//
	// private async refreshAccessToken(): Promise<void> {
	// 	const response = await fetch(REFRESH_URL, {
	// 		method: ERequestMethods.GET,
	// 		credentials: 'include',
	// 	});
	//
	// 	if (!response.ok) {
	// 		const errorData = await response.json();
	// 		// this.router.push('/login');
	// 		throw errorData.error || 'Не удалось обновить токен';
	// 	}
	// }
	//
	// private async checkAccessToken(url: string): Promise<void> {
	// 	if (URLS_WITHOUT_TOKEN.includes(url)) {
	// 		return;
	// 	}
	//
	// 	let token = this.getAccessToken();
	//
	// 	if (!token || this.isTokenExpiring(token)) {
	// 		await this.refreshAccessToken();
	// 		token = this.getAccessToken();
	//
	// 		if (!token) {
	// 			throw new Error('Не удалось получить новый токен');
	// 		}
	// 	}
	// }

	protected async makeHttpRequest(
		method: ERequestMethods,
		url: string,
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		body?: any,
		headers?: Record<string, string>,
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		// Если запрос уже в процессе, игнорируем новый запрос
		if (this.pendingRequests[url]) {
			throw new Error('EREQUESTPENDING: Запрос уже в процессе');
		}

		// Устанавливаем флаг, что запрос активен
		this.pendingRequests[url] = true;

		try {
			// await this.checkAccessToken(url);

			const options: RequestInit = {
				method,
				headers: {
					'Content-Type':
						method === ERequestMethods.POST || method === ERequestMethods.PUT
							? 'application/json'
							: '',
					...headers,
				},
				credentials: 'include',
				...(body && { body: JSON.stringify(body) }),
				...(method === ERequestMethods.GET && { next: { revalidate: 60 } }),
			};

			// eslint-disable-next-line no-undef
			const response = await fetch(url, options);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'HTTP request failed');
			}

			return response.json();
		} finally {
			// Убираем флаг после завершения запроса
			delete this.pendingRequests[url];
		}
	}
}
