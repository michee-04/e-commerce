import Joi, { ObjectSchema } from 'joi';

export const PtomotionRequestDto: ObjectSchema = Joi.object({
  discountPourcentage: Joi.number().greater(0).precision(2),
  startDate: Joi.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)))
    .messages({
      'date.min': '"startDate" doit être aujourd\'hui ou dans le futur',
    }),
  endDate: Joi.date().greater('now').messages({
    'date.greater': '"endDate" doit être après la date actuelle',
  }),
});
