import usersRoute from "./usersRoute";
import itemsRoute from "./itemsRoute";
import adressesRoute from "./adressesRoute";
import categoriesRoute from "./categoriesRoute";
import couponsRoute from "./couponsRoute";
import ordersRoute from "./ordersRoute";
import paymentMethodsRoute from "./paymentMethodsRoute";

function Routes(app) {
	usersRoute(app);
	itemsRoute(app);
	adressesRoute(app);
	categoriesRoute(app);
	couponsRoute(app);
	ordersRoute(app);
	paymentMethodsRoute(app);
}

export default Routes;