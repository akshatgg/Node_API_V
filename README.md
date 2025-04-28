# ITaxEasy API Backend Setup

This repository contains the backend API for the ITaxEasy platform built with Node.js and TypeScript.

## Prerequisites

- Git
- Node.js (see version requirements below)
- npm/yarn/pnpm

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/itax-easy/node-api.git
cd node-api
```

### 2. Special Node.js Version Requirements

This project requires specific Node.js version handling during installation:

1. **First, switch to Node.js 16.x** (required for initial dependency installation):
   ```bash
   # Using nvm (Node Version Manager)
   nvm install 16
   nvm use 16
   
   # Or install Node.js 16.x directly from nodejs.org
   ```

2. **Install dependencies using Node.js 16.x**:
   ```bash
   npm install
   ```

3. **Install Sharp library with optional dependencies**:
   ```bash
   npm install --include=optional sharp
   ```
   > **Important**: The Sharp library requires this specific installation command to ensure all necessary platform-specific dependencies are properly installed.

4. **After installation, switch back to your preferred Node.js version**:
   ```bash
   # Using nvm
   nvm use 18    # or your preferred version
   ```

### 3. Environment Setup

Create a `.env` file in the root directory and add the necessary environment variables:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
# Add other required environment variables
```

### 4. Running the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

## Todos
- [ ] Multiple Document Upload
- [ ] Mailing List
- [ ] Phone/Mobile Numbers List

## Download and Run
```bash
# Clone the repository
git clone https://github.com/itax-easy/node-api.git

# Change directory
cd node-api

# Install dependencies with Node.js 16
nvm use 16
npm install
npm install --include=optional sharp

# Run the application
npm run start
```

## Current Working APIs
All sandbox APIs before GSTR2 are currently functioning.

## Troubleshooting Common Issues

### Sharp Library Issues

If you encounter errors related to the Sharp library:

1. Ensure you've installed it with the optional dependencies:
   ```bash
   npm install --include=optional sharp
   ```

2. If issues persist, try platform-specific installation:
   ```bash
   npm install --os=linux --cpu=x64 sharp
   ```

3. Make sure system dependencies are installed:
   ```bash
   # On Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install -y build-essential libvips-dev
   ```

### Memory Issues

If the application crashes with "Killed" message:

1. Increase Node.js memory limit:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=8192"
   ```

2. Check system resources and consider upgrading your server if needed.

## API Documentation

API documentation is available at `/api-docs` when running the server locally.

## Deployment

This project is hosted on GoDaddy at [api.itaxeasy.com](https://api.itaxeasy.com).

## License

[Include your license information here]