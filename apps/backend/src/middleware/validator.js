const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ status: 'error', message: errorMessage });
  }
  next();
};

const retentionSchemas = {
  simulate: Joi.object({
    user_id: Joi.string().required(),
    plan_tier: Joi.string(),
    usage_score: Joi.number(),
    complaints_count: Joi.number(),
    network_drops: Joi.number(),
    payment_status: Joi.string()
  }),
  claimEscalation: Joi.object({
    escalation_id: Joi.string().required(),
    user_id: Joi.string().required(),
    specialist_id: Joi.string().required(),
    specialist_name: Joi.string().required(),
    churn_risk: Joi.number()
  }),
  adminSettings: Joi.object({
    model_version: Joi.string(),
    retention_threshold: Joi.number(),
    auto_escalation: Joi.boolean(),
    region: Joi.string()
  }),
  addSpecialist: Joi.object({
    username: Joi.string().required(),
    role: Joi.string().required(),
    specialty: Joi.string().required(),
    status: Joi.string().default('offline')
  }),
  predict: Joi.object({
    user_id: Joi.string().required(),
    usage: Joi.number(),
    complaints: Joi.number(),
    payment_delay: Joi.number()
  }),
  agent: Joi.object({
    user_id: Joi.string().required(),
    context: Joi.object()
  }),
  executeAction: Joi.object({
    escalation_id: Joi.string().required(),
    action_type: Joi.string().required(),
    parameters: Joi.object()
  })
};

module.exports = {
  validate,
  retentionSchemas
};
