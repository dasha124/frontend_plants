import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/type_plants');
	}, [navigate]);
};
