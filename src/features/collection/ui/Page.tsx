import { IconCheck, IconEdit } from '@tabler/icons-react';
import { Descriptions, Divider, Input } from 'antd';
import React from 'react';

import { useCollection } from '@/features/collection/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const {
		isLoaded,
		isEditMode,
		collectionInfo,
		fields,
		collectionName,
		handleEditBtnClick,
		handleChangeCollectionName,
		handleSaveCollectionName,
	} = useCollection(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<div className={cn('flex justify-center items-center gap-4')}>
				{isEditMode ? (
					<>
						<Input
							className={'w-max'}
							placeholder={'Название коллекции'}
							value={collectionName}
							onChange={handleChangeCollectionName}
							allowClear
						/>
						<IconCheck
							className={'cursor-pointer'}
							onClick={handleSaveCollectionName}
						/>
					</>
				) : (
					<>
						<h1 className={'text-white text-center text-4xl font-bold'}>
							{collectionName}
						</h1>
						<IconEdit
							className={'cursor-pointer'}
							onClick={handleEditBtnClick}
						/>
					</>
				)}
			</div>

			<Descriptions column={1}>
				{fields.map((item, index) => (
					<Descriptions.Item
						key={index}
						label={<span className={'text-xl font-bold'}>{item.label}</span>}
					>
						<span className={'text-xl'}>{item.value}</span>
					</Descriptions.Item>
				))}
			</Descriptions>

			<Divider orientation={'left'}>Растения</Divider>

			<div className={cn('flex flex-wrap w-full justify-center gap-4')}>
				{collectionInfo?.plants.map((plant) => (
					<PlantItem
						key={plant.id}
						plant={plant}
					/>
				))}
			</div>
		</RenderIf>
	);
};
