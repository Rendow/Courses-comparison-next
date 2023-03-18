import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interfaces';
import { TopPageModel } from '../interfaces/page.interfaces';
import { ProductModel } from '../interfaces/product.interfaces';

export const generalApi = {
	getPages: (firstCategory: number) =>
		axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
			firstCategory,
		}),

	getTopPages: (alias: string) => axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + alias),

	getProducts: ({ category, limit = 10 }: { category: number; limit: number }) =>
		axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
			category: category,
			limit: limit,
		}),
};
