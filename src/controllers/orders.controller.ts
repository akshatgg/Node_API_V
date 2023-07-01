import { Request, Response } from 'express';
import { prisma } from '../index';
import TokenService from '../services/token.service';

export default class OrdersController {
    public static async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const { services, status, price, gst, orderTotal, stateOfSupply, payments } = req.body;

            const { id: userId } = req.user!;

            const order = await prisma.order.create({
                data: {
                    services,
                    status,
                    price,
                    userId,
                    gst,
                    orderTotal,
                    stateOfSupply,
                    payments: { create: payments },
                },
            });
            return res.json({ success: true, message: 'Order created successfully', data: order });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to create order' });
        }
    }

    public static async getOrders(req: Request, res: Response): Promise<Response> {
        try {
            const { id: userId } = req.user!;
            
            const orders = await prisma.order.findMany({ where: { userId } });
            return res.json({ success: true, message: 'Orders fetched successfully', data: orders });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
        }
    }

    public static async getOrderById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const { id: userId } = req.user!;

            const order = await prisma.order.findFirst({ where: { id, userId } });
            if (order) {
                return res.json({ success: true, message: 'Order fetched successfully', data: order });
            } else {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch order' });
        }
    }

    public static async updateOrder(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { services, status, price, gst, orderTotal, stateOfSupply, payments } = req.body;
        try {
            const { id: userId } = req.user!;

            const order = await prisma.order.findFirst({ where: { id, userId } });

            if(!order) {
                return res.status(404).send({ success: false, message: 'Order does not exists.' });
            }

            const updatedOrder = await prisma.order.update({
                where: { id },
                data: {
                    services,
                    status,
                    price,
                    gst,
                    orderTotal,
                    stateOfSupply,
                    payments: { set: payments },
                },
            });
            return res.json({ success: true, message: 'Order updated successfully', data: updatedOrder });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to update order' });
        }
    }

    public static async deleteOrder(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const { id: userId } = req.user!;

            const order = await prisma.order.findFirst({ where: { id, userId } });

            if(!order) {
                return res.status(404).send({ success: false, message: 'Order does not exists.' });
            }

            await prisma.order.delete({ where: { id } });
            return res.json({ success: true, message: 'Order deleted successfully' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to delete order' });
        }
    }
}