# SupplementX

*"Fuel Your Gains — Smart."*

## 1. Overview

SupplementX is a next-generation fitness supplement delivery platform designed to connect gym-goers and athletes with premium-quality workout supplements. It leverages an AI-powered recommendation engine and aims for a blockchain-verified supply chain to ensure product authenticity and transparent reviews.

The platform comprises three key interfaces:
*   **User Mobile App:** For customers to discover, learn about, and purchase supplements.
*   **Pharmacy Dashboard:** For vendors to manage inventory, orders, and product listings.
*   **Courier Service Dashboard:** For logistics partners to manage and track deliveries.

### 1.1 Target Audience

*   **End Users:** Gym-goers, athletes, fitness enthusiasts.
*   **Pharmacies / Vendors:** Retailers, supplement suppliers, nutrition stores.
*   **Logistics Partners:** Delivery personnel and fleet managers.

### 1.2 Platforms

*   **Mobile App:** iOS & Android (developed using React Native).
*   **Web Admin Panel:** For Pharmacy and Courier Dashboards (e.g., using React.js or Vue.js - specific implementation may vary).

## 2. Core Features

### 2.1 User Page (Customer Interface)

*   **AI-Powered Supplement Advisor:** Personalized recommendations based on user profiles and goals.
*   **Smart Cart & Stack Builder:** Easy creation of custom supplement stacks.
*   **Progress Tracker:** Potential integration with wearables to adjust suggestions.
*   **Verified Reviews & Ratings:** Aiming for blockchain-backed reviews for authenticity.
*   **Subscription Plans:** Auto-renewal options for convenience.
*   **AR Label Scanner:** Scan product barcodes for instant AR-enhanced information.
*   **Community Forum:** User engagement and shared experiences.

### 2.2 Pharmacy Dashboard (Admin + Vendor Interface)

*   **Inventory Management System (IMS):** Real-time stock tracking and alerts.
*   **Smart Pricing Engine:** Dynamic pricing capabilities.
*   **AI Quality Checker:** Tools to verify supplement authenticity.
*   **Order Fulfillment Pipeline:** Integration with courier systems.

### 2.3 Courier Service Page (Logistics Interface)

*   **Real-Time Order Tracking:** GPS-based live updates and ETAs.
*   **Fleet Management System:** Optimized order assignment to couriers.
*   **Cold Chain Support:** Monitoring for temperature-sensitive products.

## 3. Technology Stack (Highlights)

*   **Frontend (Mobile):** React Native, Expo
*   **Frontend (Web Dashboards):** React.js / Vue.js (TBD or as per specific dashboard needs)
*   **Backend:** Hono, tRPC (running on Node.js)
*   **Database:** PostgreSQL / MongoDB (as per backend service needs)
*   **Machine Learning:** TensorFlow Lite / ONNX for on-device recommendations.
*   **Blockchain (Planned):** Hyperledger Fabric for review verification and product traceability.
*   **Push Notifications:** Firebase Cloud Messaging / OneSignal.
*   **Payments:** Integration with gateways like Stripe, PayPal, including local methods like M-Pesa.

## 4. Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 4.1 Prerequisites

*   **Node.js:** (LTS version recommended)
*   **Bun:** Install via `npm install -g bun` or visit [Bun's official website](https://bun.sh/) for other installation methods.
*   **Git:** For cloning the repository.
*   **Watchman:** (Recommended for macOS users for better performance with Metro bundler) - `brew install watchman`
*   **Expo Go App:** Install on your iOS or Android device for running the mobile app.

### 4.2 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url-here>
    cd SupplementX
    ```
    *(Replace `<your-repository-url-here>` with the actual URL of this repository)*

2.  **Install frontend dependencies:**
    ```bash
    bun install
    ```

3.  **Setup backend services:**
    The backend is powered by Hono and tRPC and is located in the `backend/` directory.
    ```bash
    cd backend
    bun install
    cd ..
    ```

### 4.3 Running the Application

#### 4.3.1 Mobile App (User Interface)

Ensure you have the Expo Go app installed on your mobile device.

```bash
# This is the typical start command, verify with package.json
bunx rork start --tunnel
```
Scan the QR code generated in the terminal with your Expo Go app. The `--tunnel` option allows devices not on the same local network to connect.

#### 4.3.2 Backend Server

The backend server (Hono/tRPC) needs to be running for the app to fetch data and perform operations.

```bash
cd backend
bun run dev # Or the script specified in backend/package.json
```
This will typically start the server on a local port (e.g., `http://localhost:3000`). Ensure your mobile app's API calls are configured to point to this address during development.

#### 4.3.3 Web Dashboards (Pharmacy/Courier)

If web dashboards are part of this specific repository and have their own startup scripts (e.g., within a `dashboard/` folder or as part of the main `package.json`), refer to those specific instructions. The `package.json` includes:
*   `start-web`: `bunx rork start --web --tunnel`
*   `start-web-dev`: `DEBUG=expo* bunx rork start --web --tunnel`

## 5. Project Structure

A brief overview of the key directories:

*   `app/`: Contains the screens and navigation logic for the React Native mobile application (using Expo Router).
    *   `(tabs)/`: Main tab-based navigation screens.
    *   `supplement/[id].tsx`: Product detail screen.
    *   Other screens for cart, checkout, profile, auth, etc.
*   `assets/`: Static assets like images and fonts.
*   `backend/`: Houses the backend services built with Hono and tRPC.
    *   `hono.ts`: Main Hono application setup.
    *   `trpc/`: tRPC router, procedures, and context.
*   `components/`: Shared UI components used across the mobile app.
*   `constants/`: Global constants like color schemes, supplement data.
*   `lib/`: Utility functions, including the tRPC client setup (`trpc.ts`).
*   `stores/`: State management stores (e.g., Zustand for cart).
*   `package.json`: Lists project dependencies and scripts.

## 6. Contributing

(Optional: Details on how to contribute, coding standards, pull request process, etc., can be added here if the project is open to contributions.)

---
