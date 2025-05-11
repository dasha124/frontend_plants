import { Button, Collapse, Descriptions, Divider } from 'antd';
import React from 'react';

import defaultImage from '@/assets/images/default-image.png';
import { usePlantInfo } from '@/features/plant/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { PlantRecommendationItem } from '@/widgets/plantRecommendationItem/ui';

type Props = {
	id: string;
};

export const PlantInfo: React.FC<Props> = ({ id }) => {
	const {
		isLoaded,
		isFetching,
		plantInfo,
		mainFields,
		part1,
		part2,
		part3,
		isSuperuser,
		plantRecommendations,
		isDebugMode,
		handleDelete,
		handleAddToCollection,
		loadRecommendations,
	} = usePlantInfo(id);

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-col p-4 gap-8')}
		>
			<h1 className={'text-center text-4xl font-bold'}>{plantInfo?.name}</h1>

			<div className={'flex flex-col md:flex-row gap-4'}>
				<img
					src={isDebugMode ? defaultImage : plantInfo?.image}
					alt={plantInfo?.name}
					className={'h-full'}
					style={{
						maxWidth: '400px',
						aspectRatio: '16 / 9',
						objectFit: 'cover',
					}}
				/>

				<Descriptions column={1}>
					{mainFields?.map((item, index) => (
						<Descriptions.Item
							key={index}
							label={<span className={'text-xl font-bold'}>{item.label}</span>}
						>
							<span className={'text-xl'}>{item.value}</span>
						</Descriptions.Item>
					))}
				</Descriptions>
			</div>

			<div>
				{isSuperuser ? (
					<Button onClick={handleDelete}>Удалить</Button>
				) : (
					<Button
						type={'primary'}
						onClick={handleAddToCollection}
					>
						Добавить в коллекцию
					</Button>
				)}
			</div>

			<Divider orientation={'left'}>Информация</Divider>

			<div>
				<div className='inline-block w-full md:w-1/2 xl:w-1/3 align-top p-2'>
					<Collapse items={part1} />
				</div>
				<div className='inline-block w-full md:w-1/2 xl:w-1/3 align-top p-2'>
					<Collapse items={part2} />
				</div>
				<div className='inline-block w-full md:w-1/2 xl:w-1/3 align-top p-2'>
					<Collapse items={part3} />
				</div>
			</div>

			<Divider />

			<RenderIf condition={!isSuperuser}>
				<Button
					onClick={loadRecommendations}
					type={'primary'}
					loading={isFetching}
				>
					Получить рекомендации
				</Button>
			</RenderIf>

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
