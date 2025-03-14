import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const usePage = () => {
	const { id } = useParams();

	const [canRender, setCanRender] = useState(false);

	useEffect(() => {
		setCanRender(!(!id || isNaN(+id)));
	}, [id]);

	return { canRender, id };
};
