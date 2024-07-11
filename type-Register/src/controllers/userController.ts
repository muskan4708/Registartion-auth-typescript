// src/controllers/userController.ts

import { Request, Response } from "express";
import User, { IUser } from "../models/usermodels"; // Assuming your user model is defined here
import bcrypt from "bcryptjs";


// Controller function for user registration
export const registerUser = async (req: Request, res: Response) => {
    debugger;
    const { username, email, password } = req.body;

    try {
        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }

        // Create a new user instance
        const newUser: IUser = new User({
            username,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = newUser.generateToken();

        // Set the token in a cookie for the registered user
        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
                // Additional cookie options (secure, sameSite, etc.)
            });
        }

        // Respond with success message and token
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        // Handle any errors
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function for user login
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists with the provided email
        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = user.generateToken();

        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
            });
        }

        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//lofgout
export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
    }
};

//getUsers
export const getUsers = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1; // Default page number is 1
    const limit = parseInt(req.query.limit as string) || 5; // Default limit is 10

    try {
        const users = await User.find()
            .skip((page - 1) * limit) // Skip records
            .limit(limit); // Limit number of records

        const totalUsers = await User.countDocuments(); // Total count of users

        res.status(200).json({
            users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//getUser by id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log("id", id);
        const users = await User.findById(id);
        res.status(200).json({
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//Delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log("id", id);
        const users = await User.findByIdAndDelete(id);
        res.status(200).json({
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};