const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //Validador de daos para entrar no backend

const OngController = require('./controllers/OngControllers');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

//ONGS
routes.get('/ongs', OngController.index); // busca arquivo controller ONGS require('./controllers/OngControllers')

routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); // busca arquivo controller ONGS require('./controllers/OngControllers')
//celebrate deve ficar nesta posição pois primeiro deve validar e depois inserir resultados, se ficasse depois do OngController.create o Node iria inserir primeiro e depois validar.



//Incidents
routes.post('/incidents', celebrate({
    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentsController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.number(),
    })
}), IncidentsController.index);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentsController.delete); //parametro route



//Personalizadas
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({ // Como autenticar dados recebido pelo header
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

module.exports = routes;
