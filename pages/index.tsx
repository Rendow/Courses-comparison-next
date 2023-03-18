import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { generalApi } from "../api/general";
import {Button, Htag, P, Rating, Tag} from "../components";
import { MenuItem } from "../interfaces/menu.interfaces";
import { withLayout } from "../layout/Layout";

function Home({ firstCategory, menu }:HomeProps) {
	const [first, setfirst] = useState<number>(0);

	
	return (
		<>
			<Htag tag='h1'>Test </Htag>
			<Button appearance="primary" >Кнопка</Button>
			<Button appearance="ghost" arrow="down">Кнопка</Button>
			<P> sdfasd</P>
			<P size="l"> sdfasd</P>
			<Tag size="s" > small</Tag>
			<Tag color="green" href='_blank'> Green</Tag>
			<Tag  color="primary" href='_blank'> sdfasd</Tag>
			<Rating rating={first} isEditable={true} setRating={setfirst}/>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps:GetStaticProps<HomeProps> = async () => {

	const firstCategory = 0;
	const { data: menu } = await generalApi.getPages(firstCategory);

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

