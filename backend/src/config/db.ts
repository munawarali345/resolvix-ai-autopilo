// ================================================================
// MongoDB Connection + Environment Validation Helper
// ================================================================

// Import mongoose for MongoDB connection
import mongoose from "mongoose";

// Import our Zod-based env validation function
import { env } from "../config/validateEnv.js";

// Import logger for structured logging
import logger from "../lib/logger.js";

// ================================================================
// MongoDB Connection Event Listeners
// ================================================================

// Fires when MongoDB connection is established
// Ye event tab trigger hota he jab database successfully connect ho jaye
mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established");
});

// Fires when MongoDB connection is disconnected
// Ye event tab trigger hota he jab database connection toot jaye
mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB connection lost");
});

// Fires when MongoDB throws connection error
// Ye event database related errors ko capture karega
mongoose.connection.on("error", (error) => {
    logger.error("MongoDB connection error", { error });
});

// ================================================================
// Function to connect to MongoDB safely
// ================================================================
export const connectDB = async () => {

    // Step 1: Check if already connected
    // Mongoose stores all connections in mongoose.connections array
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connections[0]?.readyState === 1) {
        logger.info("MongoDB already connected");
        return;
    }

    try {
        // Step 2: Connect to MongoDB using mongoose.connect()
        // Options explained:
        // serverSelectionTimeoutMS: 5000 → fail fast if DB unreachable (5 seconds)
        await mongoose.connect(env.MONGO_URI, {
            // env validation env se validate hua he
            serverSelectionTimeoutMS: 5000,
        });

        // Step 3: Connection successful
        // Log for monitoring / development purposes
        logger.info("MongoDB connected successfully");

    } catch (err) {

        // Step 4: Connection failed
        // Log actual error for debugging
        logger.error("Database connection failed", { error: err });

        // Throw error so API routes / startup know DB is not ready
        throw new Error("Database connection failed");
    }

};

// ================================================================
// Graceful Shutdown Handler
// ================================================================

// Jab application ko CTRL + C ya shutdown signal mile
// To database connection ko proper tarike se close karo
process.on("SIGINT", async () => {

    try {

        // MongoDB connection close karo
        await mongoose.connection.close();

        // Success log
        logger.info("MongoDB connection closed successfully");

        // Process ko successful exit code ke sath band karo
        process.exit(0);

    } catch (error) {

        // Agar connection close karte waqt error aaye
        logger.error("Error while closing MongoDB connection", {
            error,
        });

        // Failure exit code
        process.exit(1);
    }

});