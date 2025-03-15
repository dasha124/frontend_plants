import React from 'react';

import { Page } from '@/features/collection/ui';
import { usePage } from '@/pages/collection/model';
import { RenderIf } from '@/shared/utils';

export const CollectionPage: React.FC = () => {
	const { canRender, id } = usePage();

	return (
		<RenderIf condition={canRender}>
			<Page id={id!} />
		</RenderIf>
	);
};
