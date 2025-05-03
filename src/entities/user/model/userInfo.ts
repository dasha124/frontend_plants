export type TUserWithPW = {
	username: string;
	password: string;
};

export type TUserInfoApi = {
	user_id: string;
	user_name: string;
	is_superuser: boolean;
};

export type TUserInfoModel = {
	id: string;
	name: string;
	isSuperuser: boolean;
};

export class UserInfo {
	id: string;
	name: string;
	isSuperuser: boolean;

	constructor({ id, name, isSuperuser }: TUserInfoModel) {
		this.id = id;
		this.name = name;
		this.isSuperuser = isSuperuser;
	}

	static createFromApi(userInfo: TUserInfoApi): UserInfo {
		return new UserInfo({
			id: userInfo.user_id,
			name: userInfo.user_name,
			isSuperuser: userInfo.is_superuser,
		});
	}
}
