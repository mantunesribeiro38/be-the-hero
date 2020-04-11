const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.get('/ongs',OngController.index);

/*
* Query
* Route
* Body
*/
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string ().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) , OngController.create);

routes.post('/incidents',
celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string ().required().min(3),
        description: Joi.string().required().min(3),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.create);

routes.get('/incidents',
celebrate({
    [Segments.QUERY]: Joi.object().keys({ 
        page: Joi.number()
    })
})
,IncidentController.index);

routes.delete('/incidents/:id',
celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),
IncidentController.delete);

routes.get('/profile', 
celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), 
ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes; 