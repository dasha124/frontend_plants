import { Card, Descriptions } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import { TCollectionShortInfo } from '@/entities/collection/model';
import { useCollectionItem } from '@/features/collections/model';
type Props = {
	collection: TCollectionShortInfo;
};

export const CollectionItem: React.FC<Props> = ({ collection }) => {
	const { fields } = useCollectionItem(collection);

	return (
		<Link to={`/collections/${collection.id}`}>
			<Card
				hoverable
				style={{ width: 360 }}
			>
				<Meta
					title={<span className={'text-xl'}>{collection.name}</span>}
					description={
						<Descriptions column={1}>
							{fields?.map((item, index) => (
								<Descriptions.Item
									key={index}
									label={
										<span className={'text-[1rem] font-bold'}>
											{item.label}
										</span>
									}
								>
									<span className={'text-[1rem]'}>{item.value}</span>
								</Descriptions.Item>
							))}
						</Descriptions>
					}
				/>
			</Card>
		</Link>
	);
};
