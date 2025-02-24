import React from 'react';

type Props = {
	id: string;
};

export const Page: React.FC<Props> = ({ id }) => {
	return (
		<div>
			<h1
				className={
					'p-4 bg-zinc-950 text-white text-center text-4xl font-bold mt-10'
				}
			>
				{`Plant ${id} Page`}
			</h1>
		</div>
	);
};
