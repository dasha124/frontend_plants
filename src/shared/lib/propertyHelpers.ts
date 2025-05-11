export const convertPropertiesToArray = (
	value: string | undefined,
): string[] => (value ? value.split(',') : []);

export const sanitizePropertyValue = (
	value: string | null | undefined,
): string | null => (!value || value.length === 0 ? null : value);
