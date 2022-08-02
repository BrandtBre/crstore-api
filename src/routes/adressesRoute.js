import controller from '../controllers/adressesController'

export default (app) => {
	app.get('/adresses', controller.get)
	app.get('/adresses/:id', controller.get)
	app.post('/adresses/persist', controller.persist)
	app.post('/adresses/persist/:id', controller.persist)
	app.post('/adresses/destroy', controller.destroy)
}