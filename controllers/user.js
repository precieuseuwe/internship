import bcrypt from "bcryptjs"
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering user");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("User registered:", newUser);

        // Send a success response to the client
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (err) {
        console.error("Unable to register user", err);

        // Fix here: use res.status().send() or res.status().json()
        res.status(500).json({ error: "Failed to register user" });
    }
};




export const getProfile = async (req, res) => {
    try {
      const users = await User.find({});
      if (users.length > 0) {
        res.status(200).json(users); // send actual data
      } else {
        res.status(404).json({ message: "No users found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

//Create a login 
export const login = async (req, res) => {
    const { email, password } = req.body; {
        try {

            const user = await User.findOne({ email });
            if (!user)
                res.status(400).json({ error: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                res.status(401).json({ error: 'incorrect password' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRECT, {
                expiresIn: "30min",
            });

            // Set token in cookie
            res.cookie('token', token, {
                httpOnly: true, // can't be accessed via JavaScript on the frontend
                sameSite: 'strict',
                maxAge: 30 * 60 * 1000, // 30 minutes
            });
            console.log(token)
            res.json({ message: 'Login successful' });

        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

//Do a research on JWT, and Token logins.
