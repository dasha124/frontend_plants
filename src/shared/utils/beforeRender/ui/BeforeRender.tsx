import React from 'react';

import { RenderIf, useBeforeRender } from '@/shared/utils';

type Props = {
	children: React.ReactNode;
};

export const BeforeRender: React.FC<Props> = ({ children }) => {
	const { canRender } = useBeforeRender();

	return <RenderIf condition={canRender}>{children}</RenderIf>;
};
