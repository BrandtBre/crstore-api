import controller from '../controllers/cartsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/carts', Authenticate, controller.get)
	app.get('/carts/user', Authenticate, controller.get)
	app.get('/carts/:id', Authenticate, controller.get)
	app.post('/carts/persist', Authenticate, controller.persist)
	app.post('/carts/persist/:id', Authenticate, controller.persist)
	app.post('/carts/destroy', Authenticate, controller.destroy)
}