const express = require('express');
const router = express.Router();

const { validate, retentionSchemas } = require('../middleware/validator');

const authController = require('../controllers/authController');

module.exports = (controller) => {
  // Public routes
  router.post('/predict', authController.verifyToken, validate(retentionSchemas.predict), controller.predict);
  router.post('/agent', authController.verifyToken, validate(retentionSchemas.agent), controller.runAgent);
  router.post('/simulate', authController.verifyToken, validate(retentionSchemas.simulate), controller.simulate);
  router.get('/memory/:userId', authController.verifyToken, controller.getMemory);
  router.get('/kpis', authController.verifyToken, controller.getKpis);
  router.post('/action', authController.verifyToken, validate(retentionSchemas.executeAction), controller.executeAction);
  
  // Protected routes
  router.get('/audit-logs', authController.verifyToken, controller.getAuditLogs);
  router.post('/escalations/claim', authController.verifyToken, validate(retentionSchemas.claimEscalation), controller.claimEscalation);
  router.get('/escalations/claimed', authController.verifyToken, controller.getClaimedEscalations);
  router.get('/escalations/pending', authController.verifyToken, controller.getPendingEscalations);
  router.post('/escalations/note', authController.verifyToken, controller.addCaseNote);
  
  // Admin routes
  router.post('/admin/settings', authController.verifyToken, validate(retentionSchemas.adminSettings), controller.updateSettings);
  router.post('/admin/specialists', authController.verifyToken, validate(retentionSchemas.addSpecialist), controller.addSpecialist);
  router.get('/admin/specialists', authController.verifyToken, controller.getSpecialists);
  router.get('/admin/health', authController.verifyToken, controller.getSystemHealth);
  
  return router;
};
