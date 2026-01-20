import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import analyzeRoutes from "./routes/analyze.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", process.env.FRONTEND_URL].filter(Boolean) as string[], // Lock to Frontend + Production
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 mins
    message: "Too many requests, please try again later."
});
app.use("/api", limiter);

// Routes
app.use("/api", analyzeRoutes);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
    console.log(`SECURE SERVER running on port ${PORT}`);
});
