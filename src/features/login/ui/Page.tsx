import { Button, Form, Input } from 'antd';
import React from 'react';

import { TField, useLogin } from '@/features/login/model';
import { cn } from '@/shared/lib';

export const Page: React.FC = () => {
	const { onFinish } = useLogin();

	return (
		<div
			className={cn(
				'flex justify-center items-center h-[calc(100vh-46px)] w-screen]',
			)}
		>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ minWidth: 460 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete='off'
			>
				<Form.Item<TField>
					label='Имя пользователя'
					name='username'
					rules={[{ required: true, message: 'Введите имя пользователя' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Пароль'
					name='password'
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item label={null}>
					<Button
						type='primary'
						htmlType='submit'
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
