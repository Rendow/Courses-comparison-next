import {  DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	children?: ReactNode;
	size?: 's' | 'l' | 'm';
}