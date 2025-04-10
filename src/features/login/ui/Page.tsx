import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { TField, useLogin } from '@/features/login/model';
import { cn } from '@/shared/lib';

export const Page: React.FC = () => {
	const { isFetching, onFinish } = useLogin();

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center gap-16',
				'h-[calc(100vh-46px-2rem)] w-screen]',
			)}
		>
			<h1 className={'text-center text-4xl font-bold'}>Вход в аккаунт</h1>

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
						loading={isFetching}
					>
						Войти
					</Button>
				</Form.Item>
			</Form>

			<div className={'flex gap-2'}>
				<span>Нет аккаунта?</span>
				<Link
					to={'/signup'}
					className={cn(
						'underline hover:text-blue-700 transition-colors duration-200',
					)}
				>
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
};
