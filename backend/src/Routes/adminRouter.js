import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { adminPanelHandler } from '../controller/adminController.js';
import isAuthenticatedForEmail from '../middleware/isAuthenticatedForEmail.js';

const adminRouter = express.Router();

// Route to access the admin panel
adminRouter.route("/panel").get(isAuthenticatedForEmail, isAuthorized(["admin"]), adminPanelHandler);


export default adminRouter;