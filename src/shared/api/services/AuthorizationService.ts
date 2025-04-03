import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model/enums';

export class AuthorizationService extends ServiceBase {
	private static instance: AuthorizationService;
	private baseUrl = '/api/';

	constructor() {
		super();
		if (AuthorizationService.instance) {
			return AuthorizationService.instance;
		}

		AuthorizationService.instance = this;
		this.config = [
			{
				name: 'login',
				url: `${this.baseUrl}login/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'signup',
				url: `${this.baseUrl}register/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'logout',
				url: `${this.baseUrl}logout/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'checkLogin',
				url: `${this.baseUrl}check/`,
				method: ERequestMethods.GET,
			},
		];
	}

	/**
	 * Авторизация пользователя
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async login(username: string, password: string): Promise<void> {
		const configItem = this.getConfigItem('login');

		return await this.makeHttpRequest(configItem.method, configItem.url);
	}

	/**
	 * Создание нового пользователя
	 */
	async signup(): Promise<void> {
		const configItem = this.getConfigItem('signup');

		return await this.makeHttpRequest(configItem.method, configItem.url);
	}

	/**
	 * Выход из аккаунта
	 */
	async logout(): Promise<void> {
		const configItem = this.getConfigItem('logout');

		return await this.makeHttpRequest(configItem.method, configItem.url);
	}

	/**
	 * Проверка авторизации пользователя
	 */
	async checkLogin(): Promise<void> {
		const configItem = this.getConfigItem('checkLogin');

		return await this.makeHttpRequest(configItem.method, configItem.url);
	}
}
