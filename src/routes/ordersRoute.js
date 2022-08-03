import controller from '../controllers/ordersController'

export default (app) => {
	app.get('/orders', controller.get)
	app.get('/orders/:id', controller.get)
	app.post('/orders/persist', controller.persist)
	app.post('/orders/persist/:id', controller.persist)
	app.post('/orders/destroy', controller.destroy)
}