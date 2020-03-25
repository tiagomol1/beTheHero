const express = require('express');
const OngController = require('./controllers/OngControllers');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);

//ONGS
routes.get('/ongs', OngController.index); // busca arquivo controller ONGS require('./controllers/OngControllers')
routes.post('/ongs', OngController.create); // busca arquivo controller ONGS require('./controllers/OngControllers')

//Incidents
routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.delete); //parametro route

//Personalizadas
routes.get('/profile', ProfileController.index);

module.exports = routes;