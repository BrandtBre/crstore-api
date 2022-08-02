import controller from '../controllers/categoriesController'

export default (app) => {
	app.get('/categories', controller.get)
	app.get('/categories/:id', controller.get)
	app.post('/categories/persist', controller.persist)
	app.post('/categories/persist/:id', controller.persist)
	app.post('/categories/destroy', controller.destroy)
}