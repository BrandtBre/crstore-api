import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/users', Authenticate, controller.getAll)
	app.post('/users/register', Authenticate, controller.register)
	app.post('/users/login', controller.login)
	app.post('/users/validate-token', Authenticate, controller.validateToken)
}