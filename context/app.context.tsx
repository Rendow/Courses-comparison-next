import {  createContext, PropsWithChildren, useState } from "react";
import { MenuItem } from "../interfaces/menu.interfaces";
import { TopLevelCategory } from "../interfaces/page.interfaces";

export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({
	menu:[],
	firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider = ({ children, menu, firstCategory  }: PropsWithChildren<IAppContext>): JSX.Element => {

	const [menuState, setMenuState] = useState<MenuItem[]>(menu)

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu)
	};

	const providedValue = {
		menu: menuState,
		setMenu,
		firstCategory,
	};

	return <AppContext.Provider value={providedValue}>
		{children}
	</AppContext.Provider>
}