import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { generalApi } from "../../api/general";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interfaces";
import { withLayout } from "../../layout/Layout";

function Type({ firstCategoryName }:TypeProps ) {
	
	return <>Нет элементов меню у {firstCategoryName}</>;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(i => '/'+i.route),
		fallback: true,
	};
};

export const getStaticProps:GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	const { data: menu } = await generalApi.getPages({firstCategory: firstCategoryItem.id});

	return {
		props: {
			menu,
			firstCategory: firstCategoryItem.id,
		}
	};
};

interface TypeProps extends Record<string, unknown> {
	menu:MenuItem[];
	firstCategory:number;
}

