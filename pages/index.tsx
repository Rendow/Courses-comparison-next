import { useState } from "react";
import {Button, Htag, P, Rating, Tag} from "../components";
import { withLayout } from "../layout/Layout";

function Home() {
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
