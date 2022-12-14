import controller from '../controllers/itemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/items/category/:categoryId', Authenticate, controller.getByCategory)
	app.get('/items', Authenticate, controller.get)
	app.get('/items/:id', Authenticate, controller.get)
	app.post('/items/persist', Authenticate, controller.persist)
	app.post('/items/persist/:id', Authenticate, controller.persist)
	app.post('/items/destroy', Authenticate, controller.destroy)
}