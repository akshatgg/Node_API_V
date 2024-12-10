import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import ApiServiceController from '../controllers/apiservice.controller.js';
import SuperadminCheck from "../middlewares/super-admin";


const apirouter = Router();

apirouter.get('/get-all-apis',ApiServiceController.getallapis);

apirouter.post('/add-api',verifyToken,ApiServiceController.addApiToCart);

// Get the user's cart
apirouter.get('/',verifyToken,ApiServiceController.getCart);

// Remove an API from the cart
apirouter.delete('/delete-api',verifyToken,ApiServiceController.deleteApiFromCart);

// Subscribe to a single API from the cart
apirouter.post('/subscribe-single-api',verifyToken,ApiServiceController.subscribeToSingleApi);

// Subscribe to all APIs in the cart
apirouter.post('/subscribe-all-apis',verifyToken,ApiServiceController.subscribeToAllApis);

apirouter.get('/get-all-categories',verifyToken,ApiServiceController.getAllApiCategories);

apirouter.get('/get-all-subscriptions/:id',verifyToken,SuperadminCheck,ApiServiceController.getAllSubscriptions);
export default apirouter;