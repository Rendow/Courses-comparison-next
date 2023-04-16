import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interfaces";
import { ProductModel } from "../../interfaces/product.interfaces";

export interface TopPageComponentProps {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
