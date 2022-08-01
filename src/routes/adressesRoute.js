import controller from '../controllers/adressesController'

export default (app) => {
	app.get('/adresses', controller.get)
	app.post('/adresses/persist', controller.persist)
	app.post('/adresses/destroy', controller.destroy)
}