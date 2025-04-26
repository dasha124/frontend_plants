import { IconCheck, IconEdit } from '@tabler/icons-react';
import { Button, Descriptions, Divider, Input } from 'antd';
import React from 'react';

import { useCollection } from '@/features/collection/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantItem } from '@/widgets/plantItem/ui';
import { PlantRecommendationItem } from '@/widgets/plantRecommendationItem/ui';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	const {
		isLoaded,
		isFetching,
		isEditMode,
		collectionInfo,
		fields,
		collectionName,
		plantRecommendations,
		handleEditBtnClick,
		handleChangeCollectionName,
		handleSaveCollectionName,
		handleDeleteCollection,
		loadRecommendations,
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

			<div>
				<Button onClick={handleDeleteCollection}>Удалить коллекцию</Button>
			</div>

			<Divider orientation={'left'}>Растения</Divider>

			<div className={cn('flex flex-wrap w-full justify-center gap-4')}>
				{collectionInfo?.plants.map((plant) => (
					<PlantItem
						key={plant.id}
						plant={plant}
					/>
				))}
			</div>

			<Divider />

			<div>
				<Button
					onClick={loadRecommendations}
					type={'primary'}
					loading={isFetching}
				>
					Получить рекомендации
				</Button>
			</div>

			<RenderIf condition={plantRecommendations.length > 0}>
				<div className={'flex flex-wrap justify-center gap-8'}>
					{plantRecommendations.map((plant) => (
						<PlantRecommendationItem
							key={plant.id}
							plant={plant}
						/>
					))}
				</div>
			</RenderIf>
		</RenderIf>
	);
};
