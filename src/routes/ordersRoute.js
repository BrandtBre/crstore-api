import controller from '../controllers/ordersController'

export default (app) => {
	app.get('/orders', controller.get)
	app.post('/orders/persist', controller.persist)
	app.post('/orders/destroy', controller.destroy)
}