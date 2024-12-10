import { Category } from './../../node_modules/.prisma/client/index.d';
import { CategoryType } from './apiservice.controller';
import { prisma } from "..";
import { Request, Response } from "express";

export default class ApiServiceController {
    static getallapis = async (req: Request, res: Response) => {
        try {
            const apis = await prisma.apiService.findMany();
            return res.status(200).json({
                success: true,
                data: apis,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    static createapi = async (req: Request, res: Response) => {
        const {
            title,
            category,
            overview,
            price,
            upcoming,
            endpoint,
            bodyParams,
            response,
            responseJSON,
          } = req.body;
        try {
            const api = await prisma.apiService.create({
                data: {
                    title,
                    category,
                    overview,
                    price,
                    upcoming,
                    endpoint,
                    bodyParams,
                    response,
                    responseJSON,
                },
            });
            return res.status(201).json({
                success: true,
                data: api,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
    static getAllApiCategories = async (req:Request, res:Response) => {
        try {
          // Fetch all unique categories
          const categories = await prisma.apiService.findMany({
            select: {
              category: true, // Select only the category field
            },
            distinct: ['category'], // Ensure unique categories
          });
      
          // Extract categories from the results
          const categoryList = categories.map(item => item.category);
      
          return res.status(200).json({
            success: true,
            message: 'API categories retrieved successfully.',
            categories: categoryList,
          });
        } catch (error) {
          console.error('Error fetching API categories:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };

    static addApiToCart = async (req:Request, res:Response) => {
        const {apiServiceId } = req.body;
        const userId = req.user?.id;  // Assuming userId is stored in req.user
        try {
          // Validate inputs
          if (!userId || !apiServiceId) {
            return res.status(400).json({
              success: false,
              message: 'userId and apiServiceId are required.',
            });
          }
      
          // Check if the user exists
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });
      
          if (!user) {
            return res.status(404).json({
              success: false,
              message: 'User not found.',
            });
          }
      
          // Check if the API service exists
          const apiService = await prisma.apiService.findUnique({
            where: { id: apiServiceId },
          });
      
          if (!apiService) {
            return res.status(404).json({
              success: false,
              message: 'API Service not found.',
            });
          }
      
          // Check if the cart exists, create it if not
          let cart = await prisma.cart.findUnique({
            where: { userId },
            include: { services: true },
          });
      
          if (!cart) {
            cart = await prisma.cart.create({
              data: {
                userId,
                services: { connect: [{ id: apiServiceId }] },
              },
            });
          } else {
            // Add the API to the cart (if not already added)
            const isAlreadyInCart = cart.services.some((service) => service.id === apiServiceId);
      
            if (isAlreadyInCart) {
              return res.status(400).json({
                success: false,
                message: 'API is already in the cart.',
              });
            }
      
            await prisma.cart.update({
              where: { userId },
              data: {
                services: {
                  connect: [{ id: apiServiceId }],
                },
              },
            });
          }
      
          return res.status(200).json({
            success: true,
            message: 'API added to cart successfully.',
          });
        } catch (error) {
          console.error('Error adding API to cart:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
      
      static getCart = async (req : Request, res:Response) => {
        const userId = req.user?.id;  // Assuming userId is stored in req.user
      
        try {
          // Validate if userId exists in req.user
          if (!userId) {
            return res.status(400).json({
              success: false,
              message: 'User ID is required.',
            });
          }
      
          // Fetch the cart and associated API services for the user
          const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
              services: true,  // Include the related ApiService data
            },
          });
      
          if (!cart) {
            return res.status(404).json({
              success: false,
              message: 'Cart not found for the user.',
            });
          }
      
          // Return the cart data
          return res.status(200).json({
            success: true,
            cart: {
              id: cart.id,
              userId: cart.userId,
              services: cart.services,  // List of ApiServices in the cart
              createdAt: cart.createdAt,
              updatedAt: cart.updatedAt,
            },
          });
        } catch (error) {
          console.error('Error retrieving cart:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
      
      static deleteApiFromCart = async (req:Request, res:Response) => {
        const userId = req.user?.id;  // Assuming userId is stored in req.user
        const { apiServiceId } = req.body;
      
        try {
          // Validate input
          if (!userId) {
            return res.status(400).json({
              success: false,
              message: 'User ID is required.',
            });
          }
      
          if (!apiServiceId) {
            return res.status(400).json({
              success: false,
              message: 'apiServiceId is required.',
            });
          }
      
          // Fetch the cart to ensure it exists and contains the ApiService
          const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
              services: true,  // Include the related ApiService data
            },
          });
      
          if (!cart) {
            return res.status(404).json({
              success: false,
              message: 'Cart not found for the user.',
            });
          }
      
          // Check if the API service is in the cart
          const apiServiceInCart = cart.services.some(service => service.id === apiServiceId);
      
          if (!apiServiceInCart) {
            return res.status(400).json({
              success: false,
              message: 'API Service not found in the cart.',
            });
          }
      
          // Remove the API service from the cart
          await prisma.cart.update({
            where: { userId },
            data: {
              services: {
                disconnect: { id: apiServiceId },  // Disconnect the API from the cart
              },
            },
          });
      
          return res.status(200).json({
            success: true,
            message: 'API removed from the cart successfully.',
          });
        } catch (error) {
          console.error('Error deleting API from cart:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      }
      static subscribeToSingleApi = async (req:Request, res:Response) => {
        const userId = req.user?.id; // Assuming userId is stored in req.user
        const { apiServiceId } = req.body;
        console.log(apiServiceId)
        try {
          // Validate input
          if (!userId) {
            return res.status(400).json({
              success: false,
              message: 'User ID is required.',
            });
          }
      
          if (!apiServiceId) {
            return res.status(400).json({
              success: false,
              message: 'API Service ID is required.',
            });
          }
      
          // Check if the API service exists in the cart
          const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { services: true },
          });
      
          if (!cart) {
            return res.status(404).json({
              success: false,
              message: 'Cart not found for the user.',
            });
          }
        console.log(cart.services.some(service => service.id))
          const apiServiceInCart = cart.services.some(service => service.id === apiServiceId);
      
          if (!apiServiceInCart) {
            return res.status(400).json({
              success: false,
              message: 'API Service not found in the cart.',
            });
          }
      
          // Add subscription for the single API
          const subscription = await prisma.subscriptions.create({
            data: {
              userId,
              services: { connect: { id: apiServiceId } },
              amountForServices: cart.services.find(service => service.id === apiServiceId)?.price || 0,
            },
          });
      
          return res.status(200).json({
            success: true,
            message: 'Subscribed to the API successfully.',
            subscription,
          });
        } catch (error) {
          console.error('Error subscribing to API:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
      static subscribeToAllApis = async (req:Request, res:Response) => {
        const userId = req.user?.id; // Assuming userId is stored in req.user
      
        try {
          // Validate input
          if (!userId) {
            return res.status(400).json({
              success: false,
              message: 'User ID is required.',
            });
          }
      
          // Fetch the user's cart with all associated APIs
          const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { services: true },
          });
      
          if (!cart || cart.services.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'Cart is empty or not found for the user.',
            });
          }
      
          // Calculate the total amount for all services
          const totalAmount = cart.services.reduce((sum, service) => sum + service.price, 0);
      
          // Add a subscription for all APIs in the cart
          const subscription = await prisma.subscriptions.create({
            data: {
              userId,
              services: {
                connect: cart.services.map(service => ({ id: service.id })), // Connect all services
              },
              amountForServices: totalAmount,
            },
          });
      
          return res.status(200).json({
            success: true,
            message: 'Subscribed to all APIs in the cart successfully.',
            subscription,
          });
        } catch (error) {
          console.error('Error subscribing to all APIs:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
      static getAllSubscriptions = async (req: Request, res: Response) => {
        const { id:apiServiceId } = req.params; // Assume API ID is passed as a route parameter
        console.log(apiServiceId)
        try {
          // Validate input
          if (!apiServiceId) {
            return res.status(400).json({
              success: false,
              message: 'API Service ID is required.',
            });
          }
    
          // Fetch all subscriptions for the specified API service
          const subscriptions = await prisma.subscriptions.findMany({
            where: {
              services: {
                some: {
                  id: apiServiceId,
                },
              },
            },
            include: {
              user: true, // Include user details for context
              services: true, // Include services in the subscription
            },
          });
          if (subscriptions.length === 0) {
            return res.status(200).json({
              success: false,
              message: 'No subscriptions found for the given API Service ID.',
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Subscriptions retrieved successfully.',
            subscriptions,
          });
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
    }