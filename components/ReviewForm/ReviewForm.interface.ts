export interface IReviewForm {
	name: string;
	title: string;
	description: string;
	rating: number
}
export interface IReviewSendData extends IReviewForm {
	productId: string;
}
export interface IReviewSendResponse {
	message:string
}