/* eslint-disable no-undef */

import { TUserInfoApi, UserInfo } from '@/entities/user/model';
import { ServiceBase } from '@/shared/api/index.ts';
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
				name: 'check',
				url: `${this.baseUrl}check/`,
				method: ERequestMethods.GET,
			},
		];
	}

	/**
	 * Авторизация пользователя
	 */
	async login(username: string, password: string): Promise<UserInfo> {
		const configItem = this.getConfigItem('login');

		let response: TUserInfoApi;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url, {
				username,
				password,
			});
		} catch (error) {
			console.error(error);

			response = { user_id: '1', user_name: 'roman', is_superuser: true };
		}

		return UserInfo.createFromApi(response);
	}

	/**
	 * Создание нового пользователя
	 */
	async signup(username: string, password: string): Promise<void> {
		const configItem = this.getConfigItem('signup');

		await this.makeHttpRequest(configItem.method, configItem.url, {
			username,
			password,
		});
	}

	/**
	 * Выход из аккаунта
	 */
	async logout(): Promise<void> {
		const configItem = this.getConfigItem('logout');

		try {
			await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Проверка авторизации пользователя
	 */
	async check(): Promise<UserInfo> {
		const configItem = this.getConfigItem('check');

		let response: TUserInfoApi;

		try {
			response = await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error) {
			console.error(error);

			response = { user_id: '1', user_name: 'roman', is_superuser: true };
		}

		return UserInfo.createFromApi(response);
	}
}
