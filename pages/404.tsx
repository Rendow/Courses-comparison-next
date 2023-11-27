import Error from "next/error";
import { withLayout } from "../layout/Layout";

export function Error404() {

	return (
		<Error statusCode={404}/>		
	);
}

export default withLayout(Error404);
