// // getting results from yakaboo search query
// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

// export const POST = async (req: Request, { params }: { params: { query: string } }) => {
// 	// const url = 'https://vivat.com.ua/knyhy';
// 	const url = `https://www.yakaboo.ua/ua/search?q=${params.query}`;
// 	const browser = await puppeteer.launch();

// 	try {
// 		const page = await browser.newPage();
// 		await page.goto(url);
// 		const books = await page.evaluate(() => {
// 			return Array.from(document.querySelectorAll('.category-card'), (e) => {
// 				return {
// 					cover: e.querySelector('img.product-image__thumb')?.getAttribute('data-src'),
// 					url: e.querySelector('.category-card-content-wrapper a')?.getAttribute('href'),
// 					// // @ts-ignore
// 					title: e.querySelector('.category-card-content-wrapper a')?.getAttribute('title'),
// 					author: e.querySelector('.creator-label')?.textContent,
// 				};
// 			});
// 		});
// 		await browser.close();
// 		return NextResponse.json(books);
// 	} catch (error) {
// 		console.log(error, 'error fetching book search results');
// 		return new NextResponse('Internal server error', { status: 500 });
// 	}

// 	// await page.click('.ui-btn-nav');
// 	// const singleBook = await page.evaluate(() => {
// 	// 	const titles = document.querySelector('.char__value')?.closest('.char__title');
// 	// 	// const bookk = titles.find((item) => item.textContent !== '');
// 	// 	// const element = titles.filter((item) => item.innerText?.trim() === 'Кількість сторінок').map((item) => item);
// 	// 	// const sdf = element.closest('span');
// 	// 	return titles;
// 	// });
// 	// const titles = await page.evaluate(() => {
// 	// 	return Array.from(document.querySelectorAll('.category-card'), async (e) => {
// 	// 		const book = {
// 	// 			cover: e.querySelector('img.product-image__thumb')?.getAttribute('data-src'),
// 	// 			url: e.querySelector('.category-card-content-wrapper a')?.href,
// 	// 			// @ts-ignore
// 	// 			title: e.querySelector('.category-card-content-wrapper a')?.innerText,
// 	// 			author: e.querySelector('.creator-label')?.textContent,
// 	// 		};
// 	// 		await page.goto(book.url);
// 	// 		const singleBook = document.querySelector('.char__title')?.textContent;
// 	// 		return singleBook;
// 	// 	});
// 	// });
// 	// await page.goto();

// 	// console.log(JSON.stringify(JSON.stringify(singleBook)));
// };
