import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';

import { TCollectionShortInfo } from '@/entities/collection/model';
import { cn } from '@/shared/lib';

type Props = {
	collection: TCollectionShortInfo;
};

export const CollectionItem: React.FC<Props> = ({ collection }) => {
	return (
		<Link to={`/collections/${collection.id}`}>
			<Card
				hoverable
				style={{ width: 240 }}
			>
				<Meta
					title={collection.name}
					description={
						<div className={cn('flex flex-col')}>
							<span>
								Дата создания: {collection.dateCreate} {collection.timeCreate}
							</span>
							<span>Колличество растений: {collection.plantsCount}</span>
						</div>
					}
				/>
			</Card>
		</Link>
	);
};
