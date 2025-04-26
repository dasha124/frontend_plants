import { Button, Form, Input, Select } from 'antd';
import React from 'react';

import { usePlantEdit, TField } from '@/features/plant/model';
import { cn } from '@/shared/lib';
import { UploadImage } from '@/shared/ui';
import { RenderIf } from '@/shared/utils';

type Props = {
	id: string;
};

export const PlantEdit: React.FC<Props> = ({ id }) => {
	const {
		isLoaded,
		plantInfo,
		isFetching,
		classOptionValues,
		subClassOptionValues,
		typeOptionValues,
		imageUrl,
		form,
		setLink,
		removeLink,
		onFinish,
		onFinishFailed,
	} = usePlantEdit(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col items-center gap-8')}
		>
			<h1 className={'text-center text-4xl font-bold'}>{plantInfo?.name}</h1>

			<Form
				form={form}
				name='edit-plant-form'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ minWidth: 750 }}
				initialValues={plantInfo || undefined}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item<TField>
					label='Изображение'
					name={'image'}
					rules={[
						{ required: true, message: 'Загрузите изображение растения' },
					]}
				>
					<UploadImage
						initialFile={imageUrl}
						setLink={setLink}
						removeLink={removeLink}
					/>
				</Form.Item>

				<Form.Item<TField>
					label='Название'
					name={'name'}
					rules={[{ required: true, message: 'Введите название растения' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Класс'
					name={'class'}
					rules={[{ required: true, message: 'Выберите класс растения' }]}
				>
					<Select
						placeholder='Выберите класс растения'
						optionFilterProp='label'
						options={classOptionValues}
						showSearch
						allowClear
					/>
				</Form.Item>

				<Form.Item<TField>
					label='Подкласс'
					name={'subclass'}
					rules={[{ required: true, message: 'Выберите подкласс растения' }]}
				>
					<Select
						placeholder='Выберите подкласс растения'
						optionFilterProp='label'
						options={subClassOptionValues}
						showSearch
						allowClear
					/>
				</Form.Item>

				<Form.Item<TField>
					label='Тип'
					name={'type'}
					rules={[{ required: true, message: 'Выберите тип растения' }]}
				>
					<Select
						placeholder='Выберите тип растения'
						optionFilterProp='label'
						options={typeOptionValues}
						showSearch
						allowClear
					/>
				</Form.Item>

				<Form.Item<TField>
					label='Общая информация'
					name={'info'}
					rules={[{ required: true, message: 'Введите общую информацию' }]}
				>
					<Input.TextArea style={{ minHeight: 120 }} />
				</Form.Item>

				<Form.Item<TField>
					label='Дополнительная информация'
					name={['properties', 'add']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Восприимчивость к вредителям'
					name={['properties', 'pests']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Токсичность'
					name={['properties', 'toxic']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Потребность в поливе'
					name={['properties', 'water']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Высота'
					name={['properties', 'height']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Ширина'
					name={['properties', 'spread']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='pH Почвы'
					name={['properties', 'phSoil']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Сезон'
					name={['properties', 'season']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Восприимчивость к болезням'
					name={['properties', 'diseases']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Дренаж почвы'
					name={['properties', 'drainage']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Позиция относительно солнца'
					name={['properties', 'position']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Что может украсить в саду'
					name={['properties', 'inGarden']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Тип почвы'
					name={['properties', 'soilType']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='К каким условиям среды толерантен'
					name={['properties', 'tolerance']}
				>
					<Input.TextArea placeholder={'Введите информацию через запятую'} />
				</Form.Item>

				<Form.Item<TField>
					label='Требуемый уровень ухода'
					name={['properties', 'maintenance']}
				>
					<Input />
				</Form.Item>

				<Form.Item<TField>
					label='Размножение'
					name={['properties', 'propagation']}
				>
					<Input />
				</Form.Item>

				<Form.Item label={null}>
					<Button
						type='primary'
						htmlType='submit'
						loading={isFetching}
					>
						Сохранить
					</Button>
				</Form.Item>
			</Form>
		</RenderIf>
	);
};
