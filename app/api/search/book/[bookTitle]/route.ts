// // getting results from yakaboo search query
// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

// export const POST = async (req: Request, { params }: { params: { bookTitle: string } }) => {
// 	// const url = 'https://vivat.com.ua/knyhy';
// 	const url = `https://www.yakaboo.ua/ua/${params.bookTitle}`;
// 	const browser = await puppeteer.launch();

// 	try {
// 		const page = await browser.newPage();
// 		await page.goto(url);
// 		const book = await page.evaluate(() => {
// 			return Array.from(document.querySelectorAll('.product__container'), (e) => {
// 				return {
// 					cover: e.querySelector('.slide__item > img')?.getAttribute('src'),
// 					url: e.querySelector('.category-card-content-wrapper a')?.getAttribute('href'),
// 					// // @ts-ignore
// 					title: e.querySelector('.base-product__title h1')?.textContent?.split(' ').slice(1).join(' '),
// 					author: e.querySelector('.product-creators')?.textContent?.trim(),
// 					rating: e.querySelector('.ui-users-stars')?.getAttribute('title'),
// 					description: e.querySelector('.description__content')?.textContent,
// 				};
// 			});
// 		});
// 		await browser.close();
// 		// return NextResponse.json([
// 		// 	{
// 		// 		cover: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img_67890_1.jpg',
// 		// 		title: ' Книга Я бачу, вас цікавить пітьма',
// 		// 		author: 'Ілларіон Павлюк',
// 		// 		rating: '4/5',
// 		// 		description:
// 		// 			'Київського кримінального психолога Андрія Гайстера відправляють консультантом у богом забуте селище Буськів Сад. Зимової ночі там зникла маленька дівчинка. А ще там водиться Звір — серійний маніяк, убивств якого тамтешні мешканці воліють не помічати... У цьому проклятому селищі, де все по колу і всі живуть життям, яке ненавидять, розслідування постійно заходить у глухий кут. Андрій вірить, що загублена дівчинка, попри все, жива і він її знайде. Але нікому, крім нього, це не потрібно.\n«Я бачу, вас цікавить пітьма» — історія про непробивну людську байдужість і пітьму всередині нас. Про чесність із собою й ціну, яку ми готові заплатити за забуття. Про гріхи, що матеріалізуються, і спокуту, дорожчу за спокій.',
// 		// 	},
// 		// ]);
// 		return NextResponse.json(book);
// 	} catch (error) {
// 		console.log(error, 'error fetching book search results');
// 		return new NextResponse('Internal server error', { status: 500 });
// 	}
// };
