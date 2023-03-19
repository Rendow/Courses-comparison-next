import { GetStaticProps } from "next";
import { generalApi } from "../api/general";
import { MenuItem } from "../interfaces/menu.interfaces";
import { withLayout } from "../layout/Layout";

function Search({ firstCategory, menu }:HomeProps ) {
	
	return (
		<>

		</>
	);
}

export default withLayout(Search);

export const getStaticProps:GetStaticProps<HomeProps> = async () => {

	const firstCategory = 0;
	const { data: menu } = await generalApi.getPages({firstCategory});

	return {
		props: {
			menu,
			firstCategory,
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu:MenuItem[];
	firstCategory:number;
}

