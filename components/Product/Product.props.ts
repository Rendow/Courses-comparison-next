import {  DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ProductModel } from '../../interfaces/product.interfaces';

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product: ProductModel
}