import { useEffect } from 'react';

// use with ref useOutsideClick(() => setDialog(false), divRef)

export const useOutsideClick = (callback: () => void, ref: React.RefObject<HTMLElement>) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};
		document.addEventListener('mouseup', handleClickOutside);
		document.addEventListener('touchend', handleClickOutside);
		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
			document.removeEventListener('touchend', handleClickOutside);
		};
	}, [callback, ref]);

	return ref;
};
