import User from "../internship/models/User.js";

const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering user");

    try {
        const newUser = new User({
            username,
            email,
            password
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

export default register;
