import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import adressesRoute from "./adressesRoute";
import categoriesRoute from "./categoriesRoute";
// import couponsRoute from "./couponsRoute";
// import ordersRoute from "./ordersRoute";
// import orderItemsRoute from "./orderItemsRoute";
// import paymentMethodsRoute from "./paymentMethodsRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	adressesRoute(app);
	Category(app);
	// Coupon(app);
	// Order(app);
	// OrderItem(app);
	// PaymentMethod(app);
}

export default Routes;