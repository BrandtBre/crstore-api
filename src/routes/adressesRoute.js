import controller from '../controllers/adressesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/adresses', Authenticate, controller.get)
	app.get('/adresses/user', Authenticate, controller.getByUserId)
	app.get('/adresses/:id', Authenticate, controller.get)
	app.post('/adresses/persist', Authenticate, controller.persist)
	app.post('/adresses/persist/:id', Authenticate, controller.persist)
	app.post('/adresses/destroy', Authenticate, controller.destroy)
}