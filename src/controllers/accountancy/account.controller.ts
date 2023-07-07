import { Request, Response } from "express";
import { prisma } from "../..";
import { Account } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export default class AccountController {

    static async createAccount(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const { accountName, date, totalDebit = 0, invoices = [], totalCredit = 0, debitBalance = 0, creditBalance = 0 } = req.body;

            if (!accountName) {
                return res.status(400).json({ success: false, message: 'Account name cannot be empty' });
            }

            if (!date) {
                return res.status(400).json({ success: false, message: 'Account date cannot be empty' });
            }

            const account = await prisma.account.create({
                data: {
                    accountName,
                    date: new Date(date),
                    totalCredit,
                    totalDebit,
                    debitBalance,
                    creditBalance,
                    invoices: {
                        create: invoices,
                    },
                    userId,
                }
            });

            return res.status(201).json({ success: true, message: 'Account created', data: { account } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async updateAccount(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const { id } = req.params;

            const { accountName, invoices, date, totalDebit, totalCredit, debitBalance, creditBalance } = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: 'Param ID is missing' });
            }

            if (!accountName) {
                return res.status(400).json({ success: false, message: 'Account name cannot be empty' });
            }

            if (!date) {
                return res.status(400).json({ success: false, message: 'Account date cannot be empty' });
            }

            const account = await prisma.account.findFirst({ where: { userId, id } });

            if (!account) {
                return res.status(404).json({ success: false, message: 'Account not found' });
            }

            const updatedAccount = await prisma.account.update({
                where: {
                    id
                },
                data: {
                    accountName,
                    date: new Date(date),
                    ...(invoices && {
                        invoices: {
                            updateMany: invoices,
                        }
                    }),
                    totalCredit: totalCredit ?? account.totalCredit,
                    totalDebit: totalDebit ?? account.totalDebit,
                    debitBalance: debitBalance ?? account.debitBalance,
                    creditBalance: creditBalance ?? account.creditBalance,
                }
            });

            return res.status(200).json({ success: true, message: 'Account updated', data: { account: updatedAccount } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async deleteAccount(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: 'Param ID is missing' });
            }

            const account = await prisma.account.findFirst({ where: { userId, id } });

            if (!account) {
                return res.status(404).json({ success: false, message: 'Account not found' });
            }

            const deletedAccount = await prisma.account.delete({ where: { id } });

            return res.status(201).json({ success: true, message: 'Account deleted', data: { account: deletedAccount } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async getAccountsByUser(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            // Pagination parameters
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedLimit = parseInt(limit.toString(), 10);

            // Calculate the offset based on the page and limit
            const offset = (parsedPage - 1) * parsedLimit;

            const count = await prisma.account.count({ where: { userId } });

            const totalPages = Math.ceil(count / parsedLimit);

            const accounts: Account[] = await prisma.account.findMany({
                where: { userId },
                skip: offset,
                take: parsedLimit,
            });

            return res.status(200).json({ success: true, data: { totalPages, totalAccounts: count, accounts } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async getAccountById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { id: userId } = req.user!;

            if (!id) {
                return res.status(400).json({ success: false, message: 'Param ID is missing' });
            }

            const account = await prisma.account.findFirst({
                where: { id, userId },
            });

            if(!account) {
                return res.status(404).json({ success: false, message: 'Account not found' });
            }

            return res.status(200).json({ success: true, data: { account } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async getAccountsByName(req: Request, res: Response) {
        try {
            const { accountName } = req.body;

            const { id: userId } = req.user!;

            // Pagination parameters
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedLimit = parseInt(limit.toString(), 10);

            // Calculate the offset based on the page and limit
            const offset = (parsedPage - 1) * parsedLimit;

            const count = await prisma.account.count({ where: { userId } });

            const totalPages = Math.ceil(count / parsedLimit);

            const accounts: Account[] = await prisma.account.findMany({
                where: { userId, accountName },
                skip: offset,
                take: parsedLimit,
            });

            return res.status(200).json({ success: true, data: { totalPages, totalAccounts: count, accountName, accounts } });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async getAccountCountByUser(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const count = await prisma.account.count({
                where: { userId }
            });

            return res.status(200).json({ success: true, count });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    // TODO: Fix this stuff, make it more robust

    static async creditAccount(req: Request, res: Response) {
        try {
            const { id: userId } = req.user!;

            const { id, amount } = req.body;

            const parsedAmount = parseFloat(amount);

            const account = await prisma.account.findFirst({
                where: {
                    id,
                    userId,
                }
            });

            if(!account) {
                return res.status(404).json({ success: false, message: 'Account not found' });
            }

            const totalCredit = account.totalCredit.toNumber() + parsedAmount;

            account.totalCredit = new Decimal(totalCredit);

            const updatedAccount = this.balanceAccount(account);

            return res.status(200).json({ 
                sucess: true, 
                message: `Account ${account.accountName} credited with amount ${amount}`,
                data: updatedAccount
            });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ success: false, message: 'Something went wrong' });
        }
    }

    static async debitAccount(req: Request, res: Response) {

    }

    static async updateAccountBalance(req: Request, res: Response) {

    }

    static async balanceAccount(account: Account) {
        const balance = AccountController.getBalance(account);

        if(!balance) {
            return;
        }

        const { amount, side } = balance;

        const updatedBalance = {
            debitBalance: account.debitBalance.toNumber(),
            creditBalance: account.creditBalance.toNumber(),
        };

        if(side === 'credit') {
            updatedBalance.creditBalance = amount;
            updatedBalance.debitBalance = 0;
        } else {
            updatedBalance.debitBalance = amount;
            updatedBalance.creditBalance = 0;
        }

        const updatedAccount = await prisma.account.update({
            where: { id: account.id },
            data: updatedBalance
        });

        return updatedAccount;
    }

    static getBalance(account: Account) {
        const debit_side = account.totalDebit.toNumber();
        const credit_side = account.totalCredit.toNumber();

        if(debit_side > credit_side) {
            const amount = debit_side - credit_side;

            return {
                side: 'credit',
                amount,
            }
        } else if(credit_side > debit_side) {
            const amount = credit_side - debit_side;

            return {
                side: 'debit',
                amount,
            }
        }
    }
}