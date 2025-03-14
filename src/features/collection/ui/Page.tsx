import React from 'react';

import { cn } from '@/shared/lib';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	return <span className={cn('text-white')}>{id}</span>;
};
