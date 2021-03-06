import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://react-cart-923ae-default-rtdb.firebaseio.com/cart.json",
				{
					method: "GET",
				}
			);
			if (!response.ok) {
				throw new Error("Fetching Cart data failed!");
			}
			const responseData = await response.json();
			return responseData;
		};

		try {
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart({
				items: cartData.items || [],
				totalQuantity: cartData.totalQuantity
			}));
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			})
		);
		const sendRequest = async () => {
			const response = await fetch(
				"https://react-cart-923ae-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Sending Cart data failed!");
			}
		};
		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success...",
					message: "Sent cart data success!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};
