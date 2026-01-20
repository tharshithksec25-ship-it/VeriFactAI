import { Router, Request, Response } from "express";
import { analyzeContent } from "../services/gemini.service";
import { z } from "zod";

const router = Router();

// Input Validation Schema
const schema = z.object({
    text: z.string().min(10, "Input must be at least 10 characters long.").max(5000, "Input exceeds 5000 characters.")
});

router.post("/analyze", async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate Input
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({ error: result.error.issues[0].message });
            return;
        }

        const { text } = result.data;

        // Call Gemini API
        const analysis = await analyzeContent(text);

        res.json(analysis);
    } catch (error) {
        console.error("Route Error - Full Details:", error);
        if (error instanceof Error) {
            console.error("Route Error Message:", error.message);
            console.error("Route Error Stack:", error.stack);
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
