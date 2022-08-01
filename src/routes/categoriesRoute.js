import controller from '../controllers/categoriesController'

export default (app) => {
	app.get('/categories', controller.get)
	app.post('/categories/persist', controller.persist)
	app.post('/categories/destroy', controller.destroy)
}