import controller from '../controllers/couponsController'

export default (app) => {
	app.get('/coupons', controller.get)
	app.get('/coupons/:id', controller.get)
	app.post('/coupons/persist', controller.persist)
	app.post('/coupons/persist/:id', controller.persist)
	app.post('/coupons/destroy', controller.destroy)
}