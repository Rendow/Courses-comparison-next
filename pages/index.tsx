import { GetStaticProps } from "next";
import { generalApi } from "../api/general";
import { MenuItem } from "../interfaces/menu.interfaces";
import { withLayout } from "../layout/Layout";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
	return <></>;
}

export default withLayout(Home);

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

