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
      static subscribeToSingleApi = async (req: Request, res: Response) => {
        const userId = req.user?.id; // Assuming userId is stored in req.user
        const { apiServiceId,totalAmount } = req.body;
      
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
      
          // Check if the cart exists for the user
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
      
          console.log('Services in user cart:', cart.services.map(service => service.id));
          // Check if the API service is in the cart
          const apiServiceInCart = cart.services.some(service => service.id === apiServiceId);
      
          if (!apiServiceInCart) {
            return res.status(400).json({
              success: false,
              message: 'The selected API service is not available in your cart.',
            });
          }
      
          // Proceed with the subscription logic (if the service is found in the cart)
          // Create the subscription
          const subscription = await prisma.subscriptions.create({
            data: {
              userId,
              services: {
                connect: { id: apiServiceId }, // Connect the selected service
              },
              amountForServices: totalAmount,
            },
          });
      
          // Remove the API service from the cart after subscription
          await prisma.cart.update({
            where: { userId },
            data: {
              services: {
                disconnect: { id: apiServiceId }, // Disconnect the selected service from the cart
              },
            },
          });
      
          return res.status(200).json({
            success: true,
            message: 'Subscribed to the API service successfully.',
            subscription,
          });
      
        } catch (error) {
          console.error('Error subscribing to the API service:', error);
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
      };
      static subscribeToAllApis = async (userId: number, serviceIds: string[]) => {
        try {
          // Validate input
          if (!userId || !serviceIds || serviceIds.length === 0) {
            throw new Error("User ID and service IDs are required.");
          }
      
          // Fetch service details to calculate the total amount
          const services = await prisma.service.findMany({
            where: {
              id: { in: serviceIds },
            },
            select: {
              id: true,
              price: true, // Assuming each service has a 'price' field
            },
          });
      
          if (services.length === 0) {
            throw new Error("No valid services found for the provided IDs.");
          }
      
          // Calculate the total amount
          const totalAmount = services.reduce((sum, service) => sum + service.price, 0);
      
          // Create the subscription and associate services with the user
          const subscription = await prisma.subscriptions.create({
            data: {
              userId,
              services: {
                connect: services.map((service) => ({ id: service.id })), // Connect selected services
              },
              amountForServices: totalAmount,
            },
          });
      
          // Remove services from the user's cart
          await prisma.cart.update({
            where: { userId },
            data: {
              services: {
                disconnect: services.map((service) => ({ id: service.id })), // Unlink services from cart
              },
            },
          });
      
          console.log("User subscribed to all services successfully:", subscription);
      
          return {
            success: true,
            message: "Subscribed to all APIs successfully.",
            subscription,
          };
        } catch (error) {
          console.error("Error subscribing to all APIs:", error);
          throw error; // Re-throw to be handled at the controller level
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
      static getcountofcart = async (req: Request, res: Response) => {
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
              services: cart.services.length,  // List of ApiServices in the cart
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
    }