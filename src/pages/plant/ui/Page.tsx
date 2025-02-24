import React from 'react';

import { Page } from '@/features/plant/ui';
import { usePage } from '@/pages/plant/model';
import { RenderIf } from '@/shared/utils';

export const PlantPage: React.FC = () => {
	const { canRender, id } = usePage();

	return (
		<RenderIf condition={canRender}>
			<Page id={id!} />
		</RenderIf>
	);
};
