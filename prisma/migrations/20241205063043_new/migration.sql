-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'normal', 'agent', 'superadmin');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('initiated', 'pending', 'success', 'failure', 'usercancelled', 'dropped', 'bounced');

-- CreateEnum
CREATE TYPE "SubscriptionsDuration" AS ENUM ('monthly', 'quarterly', 'halfYealy', 'yearly');

-- CreateEnum
CREATE TYPE "LedgerType" AS ENUM ('bank', 'cash', 'purchase', 'sales', 'directExpense', 'indirectExpense', 'directIncome', 'indirectIncome', 'fixedAssets', 'currentAssets', 'loansAndLiabilities', 'accountsReceivable', 'accountsPayable');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('credit', 'debit');

-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('customer', 'supplier');

-- CreateEnum
CREATE TYPE "ItemUnit" AS ENUM ('pieces', 'grams', 'kilograms', 'liters', 'milliliters', 'meters', 'centimeters', 'inches', 'feet', 'squareMeters', 'squareFeet', 'cubicMeters', 'cubicFeet', 'dozen', 'pack', 'carton', 'box', 'roll', 'bundle', 'pair', 'set');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('sales', 'purchase', 'sales_return', 'purchase_return');

-- CreateEnum
CREATE TYPE "ModeOfPayment" AS ENUM ('cash', 'bank', 'upi', 'credit');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('unpaid', 'paid', 'overdue');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('initiated', 'pending', 'success', 'failure', 'usercancelled', 'dropped', 'bounced');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('created', 'success', 'failed');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'unpaid', 'overdue');

-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('cash', 'creditcard', 'upi', 'netbanking', 'cheque');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('pdf', 'image', 'other');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('personal', 'education', 'home', 'business', 'car', 'property');

-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('resident', 'nri', 'foreign');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('pending', 'processing', 'review', 'accepted', 'rejected');

-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('savings', 'current', 'nri', 'fcnr', 'rd', 'fd', 'salary');

-- CreateEnum
CREATE TYPE "Under" AS ENUM ('sales', 'Revenue');

-- CreateEnum
CREATE TYPE "NAME" AS ENUM ('sales', 'cash', 'Rent', 'Expense');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('INR', 'USD', 'EUR', 'RUB');

-- CreateEnum
CREATE TYPE "StartupCategory" AS ENUM ('registration', 'companyRegistration', 'returns', 'audits');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "fatherName" TEXT,
    "phone" TEXT,
    "gender" "UserGender" NOT NULL,
    "address" TEXT,
    "pin" TEXT,
    "aadhaar" TEXT,
    "pan" TEXT,
    "dob" TIMESTAMP(3),
    "avatar" TEXT,
    "adminId" INTEGER,
    "superadminId" INTEGER,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userType" "UserType" NOT NULL DEFAULT 'normal',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "otp" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "pan" TEXT,
    "aadhaar" TEXT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "gender" "UserGender" NOT NULL,
    "address" TEXT,
    "pincode" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "pan" TEXT,
    "tan" TEXT,
    "taxpayer_type" TEXT,
    "msme_number" TEXT,
    "status" TEXT,
    "ctb" TEXT,
    "gstin" TEXT,
    "statecode" TEXT,
    "street" TEXT,
    "city" TEXT,
    "dst" TEXT,
    "stcd" TEXT,
    "landmark" TEXT,
    "bankName" TEXT,
    "bankAccountNo" TEXT,
    "bankIfsc" TEXT,
    "bankBranch" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAddressVerified" BOOLEAN,
    "isBusinessNameVerified" BOOLEAN,
    "isGstinVerified" BOOLEAN,
    "isPanVerified" BOOLEAN,
    "isStateVerified" BOOLEAN,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "upcoming" BOOLEAN NOT NULL,
    "endpoint" JSONB,
    "bodyParams" JSONB,
    "response" JSONB,
    "responseJSON" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "amountForServices" DOUBLE PRECISION NOT NULL,
    "txnid" TEXT,
    "pid" TEXT,
    "subscriptionDuration" "SubscriptionsDuration" NOT NULL DEFAULT 'monthly',
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" TEXT NOT NULL,
    "ledgerName" TEXT NOT NULL,
    "openingBalance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "userId" INTEGER NOT NULL,
    "partyId" TEXT,
    "year" INTEGER NOT NULL DEFAULT 2023,
    "month" INTEGER NOT NULL DEFAULT 0,
    "ledgerType" "LedgerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "ledgerId" TEXT NOT NULL,
    "journalEntryId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "type" "PartyType" NOT NULL,
    "gstin" TEXT,
    "pan" TEXT,
    "tan" TEXT,
    "upi" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,
    "bankIfsc" TEXT,
    "bankBranch" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "unit" "ItemUnit" NOT NULL DEFAULT 'pieces',
    "price" DECIMAL(65,30) NOT NULL,
    "openingStock" DECIMAL(65,30),
    "closingStock" DECIMAL(65,30),
    "purchasePrice" DECIMAL(65,30),
    "cgst" DECIMAL(65,30),
    "sgst" DECIMAL(65,30),
    "igst" DECIMAL(65,30),
    "utgst" DECIMAL(65,30),
    "taxExempted" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "hsnCode" TEXT,
    "categoryId" TEXT,
    "supplierId" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT,
    "type" "InvoiceType" NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalGst" DOUBLE PRECISION,
    "stateOfSupply" TEXT NOT NULL,
    "cgst" DOUBLE PRECISION,
    "sgst" DOUBLE PRECISION,
    "igst" DOUBLE PRECISION,
    "utgst" DOUBLE PRECISION,
    "details" TEXT,
    "extraDetails" TEXT,
    "invoiceDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "isInventory" BOOLEAN,
    "modeOfPayment" "ModeOfPayment" NOT NULL,
    "credit" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "partyId" TEXT NOT NULL,
    "gstNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InvoiceStatus" NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "itemId" TEXT,
    "quantity" INTEGER NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "taxPercent" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceType" TEXT,
    "imgUrl" TEXT,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "gst" DECIMAL(65,30) NOT NULL,
    "documents" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "services" JSONB NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "price" DECIMAL(65,30) NOT NULL,
    "gst" DECIMAL(65,30) NOT NULL,
    "orderTotal" DECIMAL(65,30) NOT NULL,
    "stateOfSupply" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "razorpay_order_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'created',
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "pan" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "sub_section" TEXT,
    "subject" TEXT NOT NULL,
    "ao_order" TEXT NOT NULL,
    "itat_no" TEXT NOT NULL,
    "rsa_no" TEXT,
    "bench" TEXT NOT NULL,
    "appeal_no" TEXT,
    "appellant" TEXT,
    "respondent" TEXT NOT NULL,
    "appeal_type" TEXT NOT NULL,
    "appeal_filed_by" TEXT NOT NULL,
    "order_result" TEXT NOT NULL,
    "tribunal_order_date" TEXT NOT NULL,
    "assessment_year" TEXT NOT NULL,
    "judgment" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "download" TEXT NOT NULL,
    "upload" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentHeading" TEXT NOT NULL,
    "contentDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "totalDebit" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "totalCredit" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "debitBalance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "creditBalance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "cv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billrecieve" (
    "id" SERIAL NOT NULL,
    "billNumber" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "itemQuantity" TEXT NOT NULL,
    "itemPrice" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'unpaid',
    "paymentMethod" "paymentMethod" NOT NULL DEFAULT 'cash',
    "dueDate" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Billrecieve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billpayable" (
    "id" SERIAL NOT NULL,
    "supplierName" TEXT NOT NULL,
    "supplierAddress" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "billDate" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "billAmount" TEXT NOT NULL,
    "billNumber" TEXT NOT NULL,
    "billDiscription" TEXT NOT NULL,
    "paymentMethod" "paymentMethod" NOT NULL DEFAULT 'cash',
    "transactionId" TEXT,
    "paymentDate" TEXT NOT NULL,
    "paymentAmount" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "comment" TEXT,
    "invoiceNumber" TEXT,

    CONSTRAINT "Billpayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedDocument" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "applicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "mandatory" BOOLEAN NOT NULL DEFAULT false,
    "type" "DocumentType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "type" "LoanType" NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "description" TEXT,
    "maxAmount" DECIMAL(65,30),
    "minAmount" DECIMAL(65,30),
    "interest" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "loanAmount" DECIMAL(65,30) NOT NULL,
    "loanStatus" "LoanStatus" NOT NULL DEFAULT 'pending',
    "applicantName" TEXT NOT NULL,
    "applicantAge" INTEGER NOT NULL,
    "loanType" "LoanType" NOT NULL,
    "applicantGender" "UserGender" NOT NULL,
    "nationality" "Nationality" NOT NULL,
    "description" TEXT NOT NULL,
    "salaried" BOOLEAN NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "permanentAddress" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "id" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAccountNo" TEXT NOT NULL,
    "bankIfsc" TEXT NOT NULL,
    "bankBranch" TEXT NOT NULL,
    "bankAccountType" "BankAccountType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisterStartup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "priceWithGst" INTEGER,
    "aboutService" TEXT,
    "userId" INTEGER NOT NULL,
    "categories" "StartupCategory" NOT NULL,

    CONSTRAINT "RegisterStartup_pkey" PRIMARY KEY ("id")
);


INSERT INTO "User" (
  "id", "email", "password", "firstName", "gender"
) VALUES (
  4, 'akshatg9636@gmail.com', 'akshat@1234', 'Akshat', 'male'
);


--
-- Dumping data for table `RegisterStartup`
--

INSERT INTO "RegisterStartup" ("id", "title", "image", "userId", "categories", "aboutService", "priceWithGst") VALUES
(1, 'Title', 'https://res.cloudinary.com/dhqpgwpgq/image/upload/v1715231378/dashboard/users/mukulbedi%40yahoo.com/register/1/Screenshot%20%282009%29_1715231376834.png', 4, 'companyRegistration', NULL, NULL),
(2, 'PF Registration', '/images/PF-Registration.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(3, 'FSSAI (Food License)', '/images/fssai.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(4, 'DSC (Digital Signature Certification)', '/images/dsc.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(5, 'Station8/NGO Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(6, 'Nidhi Company', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(7, 'ESI Registration', '/images/ESIRegistration.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(8, 'Partnership Registration', '/images/partners.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(9, 'MSME Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(10, 'License Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(11, 'ISO Registration', '/images/iso.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(12, 'Professional Tax Registration', '/images/professionalTax.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(13, 'Ration Card', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(14, 'Trust Registration', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(15, 'Trademark Reply', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(16, 'Fire License Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(17, 'IE License Partnership', '/images/MSME.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(18, 'Trade Mark Renewal', '/images/tradeMarkRenewal.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(19, 'Shop Act Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(20, 'News Paper Registration', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(21, 'PF Monthly Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(22, 'Registered Office Change', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(23, 'Corporation License', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(24, 'Company Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(25, 'Copy Right Registration', '/images/copyrightRegistration.png', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(26, 'OPC Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(27, 'Association Formation', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(28, 'Copyright Reply', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(29, 'TDS Return Filing', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(30, 'GST Registration', '/images/gst.jpeg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(31, 'TAN Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(32, 'Advertisement Agency', '/logo.svg', 4, 'registration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(33, 'Audit 44AD', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(34, 'LLP Registration', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(35, 'Share Allotment', '/logo.svg', 4, 'companyRegistration', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(36, 'ESI Monthly Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(37, 'GST Return', '/logo.svg', 4, 'returns', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(38, 'Audit 44AE', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(39, 'Accounting', '/images/accounting.webp', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999),
(40, 'Audit 44ADA', '/logo.svg', 4, 'audits', 'PF Registration, short for Provident Fund Registration, is a mandatory process for organizations in India that employ a certain minimum number of employees, typically 20 or more. It is governed by the Employees Provident Fund and Miscellaneous Provisions Act, 1952, and overseen by the Employees Provident Fund Organization (EPFO), a statutory body under the Ministry of Labour and Employment, Government of India.\n\nUnder this scheme, both employees and employers make regular contributions from the employees basic salary and dearness allowance (DA) to create a retirement savings fund. This fund provides financial security to employees during their retirement years and offers various benefits, including lump-sum withdrawals, pension, and financial assistance in emergencies.\n\nThe PF Registration process is crucial for both employers and employees, ensuring compliance with government regulations and providing retirement benefits to the workforce. Employers are required to deposit contributions regularly and maintain accurate records of transactions. The EPFO has also introduced online services to simplify the registration and management of PF accounts.', 999);

-- --------------------------------------------------------





-- CreateTable
CREATE TABLE "RegisterServices" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "aadhaarCard" TEXT NOT NULL,
    "panCard" TEXT NOT NULL,
    "gstCertificate" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "RegisterServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_4A" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "LegalName" TEXT NOT NULL,
    "GSTN" TEXT NOT NULL,
    "pos" TEXT NOT NULL,
    "invoice_No" TEXT NOT NULL,
    "invoice_date" TEXT NOT NULL,
    "invoice_value" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "cgst" TEXT NOT NULL,
    "igst" TEXT NOT NULL,
    "sgst" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "fy" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "taxpayer_type" TEXT NOT NULL,
    "trade_Name" TEXT,
    "processed_records" TEXT NOT NULL,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gstr1_4A_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_5A" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "invoice_No" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "invoice_value" TEXT NOT NULL,
    "invoice_date" TEXT NOT NULL,
    "total_taxable_value" TEXT NOT NULL,
    "integrated_tax" TEXT NOT NULL,
    "cess" TEXT NOT NULL,
    "total_invoice_value" TEXT NOT NULL,

    CONSTRAINT "Gstr1_5A_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_5A_item" (
    "id" SERIAL NOT NULL,
    "tax_rate" TEXT NOT NULL DEFAULT '0%',
    "Ammmout_of_tax" TEXT NOT NULL,
    "Igst" TEXT NOT NULL,
    "cess" TEXT NOT NULL,
    "gstr1_5A_id" INTEGER NOT NULL,

    CONSTRAINT "Gstr1_5A_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_6A" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "invoice_data" TEXT NOT NULL,
    "invoice_value" TEXT NOT NULL,
    "total_value" TEXT NOT NULL,
    "gst_payement" TEXT NOT NULL,
    "total_taxable_value" TEXT NOT NULL,
    "integarted_tax" TEXT NOT NULL,
    "cess" TEXT NOT NULL,

    CONSTRAINT "Gstr1_6A_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_6A_item" (
    "id" SERIAL NOT NULL,
    "pecentage" TEXT NOT NULL,
    "integrated_value" TEXT NOT NULL,
    "cgst" TEXT NOT NULL,
    "sgst" TEXT NOT NULL,
    "gstr1_6A_id" INTEGER NOT NULL,

    CONSTRAINT "Gstr1_6A_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_7B" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gstn" TEXT NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "taxable_value" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "central_tax" TEXT NOT NULL,
    "state_tax" TEXT NOT NULL,
    "cess" TEXT NOT NULL,
    "place_of_supply" TEXT NOT NULL,
    "total_taxable" TEXT NOT NULL,
    "integrated" TEXT NOT NULL,

    CONSTRAINT "Gstr1_7B_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_8ABCD" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gstn" TEXT NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "taxable_value" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "central_tax" TEXT NOT NULL,
    "state_tax" TEXT NOT NULL,
    "cess" TEXT NOT NULL,

    CONSTRAINT "Gstr1_8ABCD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_9B" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gstn" TEXT NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "name_as_master" TEXT NOT NULL,
    "debit_credit_note_no" TEXT NOT NULL,
    "debit_credit_note_date" TEXT NOT NULL,
    "state_tax" TEXT NOT NULL,
    "note_type" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "items_details" TEXT NOT NULL,
    "select_rate" TEXT NOT NULL,
    "note_values" TEXT NOT NULL,
    "state_tax_rs" TEXT NOT NULL,
    "central_tax" TEXT NOT NULL,
    "cess" TEXT NOT NULL,

    CONSTRAINT "Gstr1_9B_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_9B_un" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "debit_credit_note_no" TEXT NOT NULL,
    "debit_credit_note_date" TEXT NOT NULL,
    "state_tax" TEXT NOT NULL,
    "note_type" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "item_details" TEXT NOT NULL,
    "select_rate" TEXT NOT NULL,
    "note_value" TEXT NOT NULL,
    "state_tax_rs" TEXT NOT NULL,
    "central_tax_rs" TEXT NOT NULL,
    "cess" TEXT NOT NULL,

    CONSTRAINT "Gstr1_9B_un_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_11A2A2" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "supply" TEXT NOT NULL,
    "cess" TEXT NOT NULL,

    CONSTRAINT "Gstr1_11A2A2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gstr1_11B1B2" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "taxable_value" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "cess" TEXT NOT NULL,
    "igst" TEXT NOT NULL,
    "cgst" TEXT NOT NULL,
    "sgst" TEXT NOT NULL,

    CONSTRAINT "Gstr1_11B1B2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gstr1_12HSN" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sr_no" INTEGER NOT NULL,
    "pos" TEXT NOT NULL,
    "taxable_value" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "supply_type" TEXT NOT NULL,
    "cess" TEXT NOT NULL,
    "igst" TEXT NOT NULL,
    "cgst" TEXT NOT NULL,
    "sgst" TEXT NOT NULL,

    CONSTRAINT "gstr1_12HSN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryCodeList" (
    "id" TEXT NOT NULL,
    "assessYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CountryCodeList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryCode" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,

    CONSTRAINT "CountryCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoldAndSilver" (
    "id" TEXT NOT NULL,
    "assessmentYear" TEXT NOT NULL,
    "stGoldRate24CPer10Grams" TEXT NOT NULL,
    "stSilverRateFor1Kg" TEXT NOT NULL,

    CONSTRAINT "GoldAndSilver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostInflationList" (
    "id" TEXT NOT NULL,
    "financeAct" TEXT NOT NULL,
    "listName" TEXT NOT NULL,

    CONSTRAINT "CostInflationList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostInflationIndex" (
    "id" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,
    "costInflationIndex" INTEGER NOT NULL,

    CONSTRAINT "CostInflationIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanAndITCodeByStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "incomeTaxCode" INTEGER NOT NULL,
    "panCode" TEXT NOT NULL,

    CONSTRAINT "PanAndITCodeByStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanAndITCodeByStatusList" (
    "id" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,

    CONSTRAINT "PanAndITCodeByStatusList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestRatesAccrued" (
    "id" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InterestRatesAccrued_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestAccruedonNational" (
    "id" TEXT NOT NULL,
    "purchaseDuration" TEXT NOT NULL,

    CONSTRAINT "InterestAccruedonNational_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestAccruedonNationalList" (
    "id" TEXT NOT NULL,
    "listNumber" TEXT NOT NULL,
    "financeAct" TEXT NOT NULL,

    CONSTRAINT "InterestAccruedonNationalList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartToRegisterServices" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CartToRegisterStartup" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ApiServiceToCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ApiServiceToSubscriptions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountToInvoice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LoanDocumentToUploadedDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LoanToLoanDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RegisterStartupToSubscriptions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RegisterServicesToSubscriptions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryCodeToCountryCodeList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CostInflationIndexToCostInflationList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PanAndITCodeByStatusToPanAndITCodeByStatusList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestAccruedonNationalToInterestAccruedonNationalList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestAccruedonNationalToInterestRatesAccrued" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userId_key" ON "BusinessProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_txnid_key" ON "Subscriptions"("txnid");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_userId_key" ON "Agent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RegisterServices_serviceId_key" ON "RegisterServices"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_5A_sr_no_key" ON "Gstr1_5A"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_6A_sr_no_key" ON "Gstr1_6A"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_7B_sr_no_key" ON "Gstr1_7B"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_8ABCD_sr_no_key" ON "Gstr1_8ABCD"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_9B_sr_no_key" ON "Gstr1_9B"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_9B_un_sr_no_key" ON "Gstr1_9B_un"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_11A2A2_sr_no_key" ON "Gstr1_11A2A2"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "Gstr1_11B1B2_sr_no_key" ON "Gstr1_11B1B2"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "gstr1_12HSN_sr_no_key" ON "gstr1_12HSN"("sr_no");

-- CreateIndex
CREATE UNIQUE INDEX "CountryCodeList_assessYear_key" ON "CountryCodeList"("assessYear");

-- CreateIndex
CREATE UNIQUE INDEX "CostInflationList_listName_key" ON "CostInflationList"("listName");

-- CreateIndex
CREATE UNIQUE INDEX "PanAndITCodeByStatus_status_key" ON "PanAndITCodeByStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PanAndITCodeByStatusList_financialYear_key" ON "PanAndITCodeByStatusList"("financialYear");

-- CreateIndex
CREATE UNIQUE INDEX "InterestAccruedonNationalList_listNumber_key" ON "InterestAccruedonNationalList"("listNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToRegisterServices_AB_unique" ON "_CartToRegisterServices"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToRegisterServices_B_index" ON "_CartToRegisterServices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToRegisterStartup_AB_unique" ON "_CartToRegisterStartup"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToRegisterStartup_B_index" ON "_CartToRegisterStartup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApiServiceToCart_AB_unique" ON "_ApiServiceToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiServiceToCart_B_index" ON "_ApiServiceToCart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApiServiceToSubscriptions_AB_unique" ON "_ApiServiceToSubscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiServiceToSubscriptions_B_index" ON "_ApiServiceToSubscriptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToInvoice_AB_unique" ON "_AccountToInvoice"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToInvoice_B_index" ON "_AccountToInvoice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoanDocumentToUploadedDocument_AB_unique" ON "_LoanDocumentToUploadedDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_LoanDocumentToUploadedDocument_B_index" ON "_LoanDocumentToUploadedDocument"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LoanToLoanDocument_AB_unique" ON "_LoanToLoanDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_LoanToLoanDocument_B_index" ON "_LoanToLoanDocument"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RegisterStartupToSubscriptions_AB_unique" ON "_RegisterStartupToSubscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_RegisterStartupToSubscriptions_B_index" ON "_RegisterStartupToSubscriptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RegisterServicesToSubscriptions_AB_unique" ON "_RegisterServicesToSubscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_RegisterServicesToSubscriptions_B_index" ON "_RegisterServicesToSubscriptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryCodeToCountryCodeList_AB_unique" ON "_CountryCodeToCountryCodeList"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryCodeToCountryCodeList_B_index" ON "_CountryCodeToCountryCodeList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CostInflationIndexToCostInflationList_AB_unique" ON "_CostInflationIndexToCostInflationList"("A", "B");

-- CreateIndex
CREATE INDEX "_CostInflationIndexToCostInflationList_B_index" ON "_CostInflationIndexToCostInflationList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PanAndITCodeByStatusToPanAndITCodeByStatusList_AB_unique" ON "_PanAndITCodeByStatusToPanAndITCodeByStatusList"("A", "B");

-- CreateIndex
CREATE INDEX "_PanAndITCodeByStatusToPanAndITCodeByStatusList_B_index" ON "_PanAndITCodeByStatusToPanAndITCodeByStatusList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestAccruedonNationalToInterestAccruedonNational_AB_unique" ON "_InterestAccruedonNationalToInterestAccruedonNationalList"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestAccruedonNationalToInterestAccruedonNationalLi_B_index" ON "_InterestAccruedonNationalToInterestAccruedonNationalList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InterestAccruedonNationalToInterestRatesAccrued_AB_unique" ON "_InterestAccruedonNationalToInterestRatesAccrued"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestAccruedonNationalToInterestRatesAccrued_B_index" ON "_InterestAccruedonNationalToInterestRatesAccrued"("B");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocument" ADD CONSTRAINT "UploadedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocument" ADD CONSTRAINT "UploadedDocument_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "LoanApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanApplication" ADD CONSTRAINT "LoanApplication_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisterStartup" ADD CONSTRAINT "RegisterStartup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisterServices" ADD CONSTRAINT "RegisterServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "RegisterStartup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisterServices" ADD CONSTRAINT "RegisterServices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_4A" ADD CONSTRAINT "Gstr1_4A_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_5A" ADD CONSTRAINT "Gstr1_5A_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_5A_item" ADD CONSTRAINT "Gstr1_5A_item_gstr1_5A_id_fkey" FOREIGN KEY ("gstr1_5A_id") REFERENCES "Gstr1_5A"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_6A" ADD CONSTRAINT "Gstr1_6A_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_6A_item" ADD CONSTRAINT "Gstr1_6A_item_gstr1_6A_id_fkey" FOREIGN KEY ("gstr1_6A_id") REFERENCES "Gstr1_6A"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_7B" ADD CONSTRAINT "Gstr1_7B_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_8ABCD" ADD CONSTRAINT "Gstr1_8ABCD_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_9B" ADD CONSTRAINT "Gstr1_9B_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_9B_un" ADD CONSTRAINT "Gstr1_9B_un_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_11A2A2" ADD CONSTRAINT "Gstr1_11A2A2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gstr1_11B1B2" ADD CONSTRAINT "Gstr1_11B1B2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gstr1_12HSN" ADD CONSTRAINT "gstr1_12HSN_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToRegisterServices" ADD CONSTRAINT "_CartToRegisterServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToRegisterServices" ADD CONSTRAINT "_CartToRegisterServices_B_fkey" FOREIGN KEY ("B") REFERENCES "RegisterServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToRegisterStartup" ADD CONSTRAINT "_CartToRegisterStartup_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToRegisterStartup" ADD CONSTRAINT "_CartToRegisterStartup_B_fkey" FOREIGN KEY ("B") REFERENCES "RegisterStartup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiServiceToCart" ADD CONSTRAINT "_ApiServiceToCart_A_fkey" FOREIGN KEY ("A") REFERENCES "ApiService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiServiceToCart" ADD CONSTRAINT "_ApiServiceToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiServiceToSubscriptions" ADD CONSTRAINT "_ApiServiceToSubscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "ApiService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApiServiceToSubscriptions" ADD CONSTRAINT "_ApiServiceToSubscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToInvoice" ADD CONSTRAINT "_AccountToInvoice_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToInvoice" ADD CONSTRAINT "_AccountToInvoice_B_fkey" FOREIGN KEY ("B") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoanDocumentToUploadedDocument" ADD CONSTRAINT "_LoanDocumentToUploadedDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "LoanDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoanDocumentToUploadedDocument" ADD CONSTRAINT "_LoanDocumentToUploadedDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "UploadedDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoanToLoanDocument" ADD CONSTRAINT "_LoanToLoanDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoanToLoanDocument" ADD CONSTRAINT "_LoanToLoanDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "LoanDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegisterStartupToSubscriptions" ADD CONSTRAINT "_RegisterStartupToSubscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "RegisterStartup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegisterStartupToSubscriptions" ADD CONSTRAINT "_RegisterStartupToSubscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegisterServicesToSubscriptions" ADD CONSTRAINT "_RegisterServicesToSubscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "RegisterServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegisterServicesToSubscriptions" ADD CONSTRAINT "_RegisterServicesToSubscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryCodeToCountryCodeList" ADD CONSTRAINT "_CountryCodeToCountryCodeList_A_fkey" FOREIGN KEY ("A") REFERENCES "CountryCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryCodeToCountryCodeList" ADD CONSTRAINT "_CountryCodeToCountryCodeList_B_fkey" FOREIGN KEY ("B") REFERENCES "CountryCodeList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostInflationIndexToCostInflationList" ADD CONSTRAINT "_CostInflationIndexToCostInflationList_A_fkey" FOREIGN KEY ("A") REFERENCES "CostInflationIndex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostInflationIndexToCostInflationList" ADD CONSTRAINT "_CostInflationIndexToCostInflationList_B_fkey" FOREIGN KEY ("B") REFERENCES "CostInflationList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanAndITCodeByStatusToPanAndITCodeByStatusList" ADD CONSTRAINT "_PanAndITCodeByStatusToPanAndITCodeByStatusList_A_fkey" FOREIGN KEY ("A") REFERENCES "PanAndITCodeByStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PanAndITCodeByStatusToPanAndITCodeByStatusList" ADD CONSTRAINT "_PanAndITCodeByStatusToPanAndITCodeByStatusList_B_fkey" FOREIGN KEY ("B") REFERENCES "PanAndITCodeByStatusList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestAccruedonNationalToInterestAccruedonNationalList" ADD CONSTRAINT "_InterestAccruedonNationalToInterestAccruedonNationalLis_A_fkey" FOREIGN KEY ("A") REFERENCES "InterestAccruedonNational"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestAccruedonNationalToInterestAccruedonNationalList" ADD CONSTRAINT "_InterestAccruedonNationalToInterestAccruedonNationalLis_B_fkey" FOREIGN KEY ("B") REFERENCES "InterestAccruedonNationalList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestAccruedonNationalToInterestRatesAccrued" ADD CONSTRAINT "_InterestAccruedonNationalToInterestRatesAccrued_A_fkey" FOREIGN KEY ("A") REFERENCES "InterestAccruedonNational"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestAccruedonNationalToInterestRatesAccrued" ADD CONSTRAINT "_InterestAccruedonNationalToInterestRatesAccrued_B_fkey" FOREIGN KEY ("B") REFERENCES "InterestRatesAccrued"("id") ON DELETE CASCADE ON UPDATE CASCADE;
