import {  DetailedHTMLProps, HTMLAttributes,  } from 'react';
import { ReviewModel } from '../../interfaces/product.interfaces';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLParagraphElement> {
	review: ReviewModel;
}