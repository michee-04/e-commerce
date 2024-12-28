import Joi from 'joi';
import { pick } from 'lodash';

export const extractResponseData = (schema: Joi.ObjectSchema, data: any) => {
  // Extrait dynamiquement les clés du schéma Joi passé en paramètre
  const allowedKeys = Object.keys(schema.describe().keys);

  // Utilise pick de lodash pour sélectionner uniquement ces clés
  return pick(data, allowedKeys);
};
