import controller from '../controllers/paymentMethodsController'

export default (app) => {
	app.get('/payment-methods', controller.get)
	app.get('/payment-methods/:id', controller.get)
	app.post('/payment-methods/persist', controller.persist)
	app.post('/payment-methods/persist/:id', controller.persist)
	app.post('/payment-methods/destroy', controller.destroy)
}