import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";
let isInitial = true;
function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.uiSlice.cartIsVisible);
	const cart = useSelector((state) => state.cartSlice);
	const notification = useSelector((state) => state.uiSlice.notification);
	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);
	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}
		if (cart.changed === true) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);
	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
