import Error from "next/error";
import { Htag } from "../components";
import { withLayout } from "../layout/Layout";

 function Error500() {

	return (
		<Error statusCode={500}/>		
	);
}

export default withLayout(Error500);
