import { create } from 'zustand';

type ChoosedBooksState = {
	choosedBooks: string[];
	setChoosedBooks: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useChoosedBooksStore = create<ChoosedBooksState>((set) => ({
	choosedBooks: [],
	setChoosedBooks: (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		if (e.target.checked) {
			// @ts-ignore
			set((state) => {
				if (!state.choosedBooks.includes(value)) {
					return { choosedBooks: [...state.choosedBooks, value] };
				} else if (state.choosedBooks.includes(value)) {
					const clearValues = state.choosedBooks.filter((item) => item !== value);
					return { choosedBooks: [...clearValues] };
				}
			});
		} else if (!e.target.checked) {
			set((state) => {
				const clearValues = state.choosedBooks.filter((item) => item !== value);
				return { choosedBooks: [...clearValues] };
			});
		}
	},
}));

// const hasValue = e.target.checked;
// 		const value = e.target.value;
// 		console.log(bookId, 'bookid');
// 		if (hasValue) {
// 			setBookId([...bookId, value]);
// 		} else if (bookId.includes(value)) {
// 			const cleanValues = bookId.filter((item) => item !== value);
// 			setBookId([...cleanValues]);
// 		}
