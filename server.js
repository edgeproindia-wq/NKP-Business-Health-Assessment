const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const OpenAI = require("openai");

require("dotenv").config();

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());

// ======================================================
// MYSQL CONNECTION
// ======================================================

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ======================================================
// OPENAI
// ======================================================

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ======================================================
// ROOT ROUTE
// ======================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "NKP Backend is running!"
    });

});

// ======================================================
// MYSQL HEALTH CHECK
// ======================================================

app.get("/api/health", async (req, res) => {

    try {

        await db.query("SELECT 1");

        res.json({
            success: true,
            database: "MySQL",
            status: "Connected"
        });

    } catch (error) {

        console.error("MySQL Health Error:", error);

        res.status(500).json({
            success: false,
            database: "MySQL",
            status: "Disconnected"
        });

    }

});

// ======================================================
// REGISTER
// ======================================================

app.post("/api/register", async (req, res) => {

    try {

        const {
            fullName,
            businessName,
            phone,
            email,
            password
        } = req.body;

        // Validate fields

        if (
            !fullName ||
            !businessName ||
            !phone ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill in all required fields."

            });

        }

        // Check existing email

        const [existingUser] = await db.query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [email]
        );

        if (existingUser.length > 0) {

            return res.status(409).json({

                success: false,

                message:
                    "An account with this email already exists."

            });

        }

        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // ==================================================
        // INSERT USER
        // IMPORTANT:
        // users table contains:
        // id, name, email, phone, password, created_at
        // ==================================================

        const [result] = await db.query(
            `
            INSERT INTO users
            (
                name,
                email,
                phone,
                password
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                fullName,
                email,
                phone,
                hashedPassword
            ]
        );

        const userId = result.insertId;

        // ==================================================
        // SAVE BUSINESS
        // ==================================================

        let businessSaved = false;

        try {

            await db.query(
                `
                INSERT INTO businesses
                (
                    user_id,
                    business_name
                )
                VALUES (?, ?)
                `,
                [
                    userId,
                    businessName
                ]
            );

            businessSaved = true;

        } catch (businessError) {

            console.error(
                "Business Save Error:",
                businessError
            );

        }

        // ==================================================
        // RESPONSE
        // ==================================================

        res.status(201).json({

            success: true,

            message:
                "Registration successful.",

            user: {

                id: userId,

                fullName: fullName,

                businessName: businessName,

                phone: phone,

                email: email

            },

            businessSaved: businessSaved

        });

    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to create account. Please try again."

        });

    }

});

// ======================================================
// LOGIN
// ======================================================

app.post("/api/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Validate

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required."

            });

        }

        // ==================================================
        // FIND USER
        // IMPORTANT:
        // users table has "name", NOT "full_name"
        // ==================================================

        const [users] = await db.query(
            `
            SELECT
                id,
                name,
                email,
                phone,
                password
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [email]
        );

        if (users.length === 0) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }

        const user = users[0];

        // ==================================================
        // CHECK PASSWORD
        // ==================================================

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }

        // ==================================================
        // GET BUSINESS
        // ==================================================

        let business = null;

        try {

            const [businesses] = await db.query(
                `
                SELECT
                    id,
                    business_name,
                    business_type,
                    industry,
                    location,
                    start_date,
                    employees,
                    description
                FROM businesses
                WHERE user_id = ?
                ORDER BY id DESC
                LIMIT 1
                `,
                [user.id]
            );

            if (businesses.length > 0) {

                business = businesses[0];

            }

        } catch (businessError) {

            console.error(
                "Business Fetch Error:",
                businessError
            );

        }

        // ==================================================
        // LOGIN SUCCESS
        // ==================================================

        res.json({

            success: true,

            message:
                "Login successful.",

            user: {

                id: user.id,

                fullName: user.name,

                businessName:
                    business?.business_name || "",

                phone: user.phone,

                email: user.email,

                business: business

            }

        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to login. Please try again."

        });

    }

});

// ======================================================
// SAVE BUSINESS SETUP
// ======================================================

app.post("/api/business", async (req, res) => {

    try {

        const {
            userId,
            businessName,
            businessType,
            industry,
            location,
            startDate,
            employees,
            description
        } = req.body;

        // Validate

        if (
            !userId ||
            !businessName ||
            !businessType ||
            !industry ||
            !location
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill in all required business fields."

            });

        }

        // Check user

        const [users] = await db.query(
            `
            SELECT id
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
            [userId]
        );

        if (users.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "User account not found."

            });

        }

        // ==================================================
        // CHECK EXISTING BUSINESS
        // ==================================================

        const [existingBusiness] = await db.query(
            `
            SELECT id
            FROM businesses
            WHERE user_id = ?
            LIMIT 1
            `,
            [userId]
        );

        // ==================================================
        // UPDATE
        // ==================================================

        if (existingBusiness.length > 0) {

            await db.query(
                `
                UPDATE businesses
                SET
                    business_name = ?,
                    business_type = ?,
                    industry = ?,
                    location = ?,
                    start_date = ?,
                    employees = ?,
                    description = ?
                WHERE user_id = ?
                `,
                [
                    businessName,
                    businessType,
                    industry,
                    location,
                    startDate || null,
                    employees || null,
                    description || null,
                    userId
                ]
            );

        }

        // ==================================================
        // INSERT
        // ==================================================

        else {

            await db.query(
                `
                INSERT INTO businesses
                (
                    user_id,
                    business_name,
                    business_type,
                    industry,
                    location,
                    start_date,
                    employees,
                    description
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    userId,
                    businessName,
                    businessType,
                    industry,
                    location,
                    startDate || null,
                    employees || null,
                    description || null
                ]
            );

        }

        res.json({

            success: true,

            message:
                "Business setup saved successfully."

        });

    } catch (error) {

        console.error(
            "Business Setup Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to save business information."

        });

    }

});

// ======================================================
// SAVE ASSESSMENT ANSWER
// ======================================================

app.post("/api/assessment-answer", async (req, res) => {

    try {

        const {
            userId,
            categoryId,
            subcategoryId,
            questionId,
            answer,
            score
        } = req.body;

        // Validate

        if (
            !userId ||
            !categoryId ||
            !subcategoryId ||
            !questionId ||
            !answer ||
            score === undefined ||
            score === null
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Required assessment data is missing."

            });

        }

        // Check user

        const [users] = await db.query(
            `
            SELECT id
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
            [userId]
        );

        if (users.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }

        // ==================================================
        // CHECK EXISTING ANSWER
        // ==================================================

        const [existingAnswer] = await db.query(
            `
            SELECT id
            FROM assessment_answers
            WHERE user_id = ?
            AND question_id = ?
            LIMIT 1
            `,
            [
                userId,
                questionId
            ]
        );

        // ==================================================
        // UPDATE EXISTING ANSWER
        // ==================================================

        if (existingAnswer.length > 0) {

            await db.query(
                `
                UPDATE assessment_answers
                SET
                    category_id = ?,
                    subcategory_id = ?,
                    answer = ?,
                    score = ?
                WHERE id = ?
                `,
                [
                    categoryId,
                    subcategoryId,
                    answer,
                    score,
                    existingAnswer[0].id
                ]
            );

        }

        // ==================================================
        // INSERT NEW ANSWER
        // ==================================================

        else {

            await db.query(
                `
                INSERT INTO assessment_answers
                (
                    user_id,
                    category_id,
                    subcategory_id,
                    question_id,
                    answer,
                    score
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    userId,
                    categoryId,
                    subcategoryId,
                    questionId,
                    answer,
                    score
                ]
            );

        }

        res.json({

            success: true,

            message:
                "Assessment answer saved successfully."

        });

    } catch (error) {

        console.error(
            "Assessment Answer Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to save assessment answer."

        });

    }

});

// ======================================================
// GET USER ASSESSMENT ANSWERS
// ======================================================

app.get(
    "/api/assessment-answers/:userId",
    async (req, res) => {

        try {

            const userId =
                req.params.userId;

            const [answers] = await db.query(
                `
                SELECT
                    id,
                    user_id,
                    category_id,
                    subcategory_id,
                    question_id,
                    answer,
                    score,
                    created_at
                FROM assessment_answers
                WHERE user_id = ?
                ORDER BY id ASC
                `,
                [userId]
            );

            res.json({

                success: true,

                count: answers.length,

                answers: answers

            });

        } catch (error) {

            console.error(
                "Get Assessment Answers Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to retrieve assessment answers."

            });

        }

    }
);

// ======================================================
// AI CHAT
// ======================================================

app.post("/api/ai-chat", async (req, res) => {

    try {

        const {
            message,
            businessData,
            assessmentData
        } = req.body;

        if (!message) {

            return res.status(400).json({

                success: false,

                message:
                    "Message is required."

            });

        }

        const businessInfo =
            businessData
                ? JSON.stringify(
                    businessData,
                    null,
                    2
                )
                : "No business information provided.";

        const assessmentInfo =
            assessmentData
                ? JSON.stringify(
                    assessmentData,
                    null,
                    2
                )
                : "No assessment information provided.";

        const response =
            await openai.responses.create({

                model: "gpt-6-luna",

                instructions: `
You are NKP - Namma KanakkuPillai,
an AI business advisor.

Your job is to help business owners
understand their business health and
give practical improvement suggestions.

Business Information:
${businessInfo}

Assessment Information:
${assessmentInfo}

Give clear, practical and easy-to-understand
business advice.

Do not invent business information.

If the user asks about their assessment,
use the assessment information provided.

Keep the response professional,
friendly and actionable.
                `,

                input: message

            });

        res.json({

            success: true,

            message:
                response.output_text

        });

    } catch (error) {

        console.error(
            "AI Chat Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to generate AI response."

        });

    }

});

// ======================================================
// 404 ROUTE
// ======================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "API route not found."

    });

});

// ======================================================
// ERROR HANDLER
// ======================================================

app.use((error, req, res, next) => {

    console.error(
        "Server Error:",
        error
    );

    res.status(500).json({

        success: false,

        message:
            "Internal server error."

    });

});

// ======================================================
// START SERVER
// ======================================================

const PORT =
    Number(process.env.PORT) || 5000;

app.listen(PORT, async () => {

    console.log(
        `NKP Backend running on http://localhost:${PORT}`
    );

    console.log(
        `NKP AI Chat API: http://localhost:${PORT}/api/ai-chat`
    );

    console.log(
        `NKP MySQL Health API: http://localhost:${PORT}/api/health`
    );

    console.log(
        `NKP Assessment Answer API: http://localhost:${PORT}/api/assessment-answer`
    );

    try {

        await db.query("SELECT 1");

        console.log(
            "MySQL connected successfully"
        );

    } catch (error) {

        console.error(
            "MySQL connection failed:",
            error.message
        );

    }

});