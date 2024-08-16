# Task Management App - Backend API Documentation 🧑‍💻

### By Fahmy Rosyadi

## API URL 🔗
[Deployed API](https://seal-backend-fahmy.et.r.appspot.com/)
[API Docs Postman](https://documenter.getpostman.com/view/24438178/2sA3s7kUvG)

## How to Install Node Package Manager (npm) to run my project

Node Package Manager (npm) is a crucial tool in the Node.js ecosystem used for managing and installing JavaScript packages. Here are the steps to install npm on your system:

### For Windows Users:

1. **Download Node.js Installer**: Visit the official Node.js website at [nodejs.org](https://nodejs.org/) and download the Node.js installer suitable for your operating system (choose the LTS version for maximum stability).

2. **Run the Installer**: Open the downloaded installer and follow the step-by-step instructions. Make sure to select the "npm package manager" option when prompted to choose components to install.

3. **Verify Installation**: Once the installation is complete, you can open Command Prompt (cmd) or PowerShell and type the following command to check if npm was successfully installed:

    ```sh
    npm -v
    ```

    If you see the npm version displayed, it means npm has been successfully installed on your system.

### For macOS Users:

1. **Install Homebrew (Optional)**: If you haven't already installed Homebrew, you can do so by running the following command in Terminal:

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

    Homebrew is a package manager that simplifies software installations on macOS.

2. **Install Node.js Using Homebrew**: Once Homebrew is installed, you can use the following command to install Node.js along with npm:

    ```sh
    brew install node
    ```

    This will automatically install Node.js and npm.

3. **Verify Installation**: After the installation is complete, you can open Terminal and check the npm version by running the command:

    ```sh
    npm -v
    ```

    Make sure you see the npm version displayed in Terminal.

### For Linux Users:

1. **Use System Package Manager**: Most Linux distributions come with a built-in package manager that allows you to easily install npm. An example usage for Debian/Ubuntu is:

    ```sh
    sudo apt install npm
    ```

    For other distributions, you can use their respective package managers, such as `yum` for Fedora or `zypper` for openSUSE.

2. **Verify Installation**: Once the installation is complete, you can check the npm version by running the command:

    ```sh
    npm -v
    ```

    Ensure you see the npm version displayed in Terminal.

With npm successfully installed, you're ready to run your projects using various packages and tools available in the Node.js ecosystem.

## How to Run this API on Your Local Machine 💻
If you want to run this API Server on your local machine, follow these steps:
- First, clone this repository: `git clone https://github.com/rsydfhmy03/Task-Management-App.git`
- Second, open a terminal and navigate to the project's root directory.
- Third, type `npm install` in your terminal and hit Enter.
- Fourth, type `npm run start:dev` in your terminal and hit Enter.
- Finally, the server will run at: http://localhost:3000

## Tech Used 🔧
My project is created with:
* Express.js: A minimalist web framework for Node.js.
* Cloud SQL : Using CLoud SQL (MySQL Version 5.6)
* Google App Engine: A fully managed serverless application platform provided by Google Cloud.
* Google Cloud Storage: A unified object storage for developers and enterprises
