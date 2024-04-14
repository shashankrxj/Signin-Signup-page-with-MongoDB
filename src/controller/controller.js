const bcrypt = require("bcryptjs");
const User = require("../models/model");


// When user sinup for the first time
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create a new user
        const newUser = new User({
            username,
            email,
            password
        });
        
        //generate Tokens
        const token = await newUser.generateAuthToken();

        //save token as a cookie
        res.cookie("jwt",token, {
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            secure: true, // Only sent over HTTPS
            sameSite: 'none' // Allows cross-origin cookies
        });
        console.log(token);

        // Save the user to the database
        await newUser.save();

        // Construct the JSON data
        const jsonData = {
            message: "User created successfully",
            user: newUser
        };
        console.log("successfully signedup");
        // Render the signup page with embedded JSON data
        return res.status(201).render("sign_page", { jsonData: JSON.stringify(jsonData) });
    } catch (error) {
        // Define res object here
        if (error.errors) {
            let validationErrors = [];

            if (error.errors.username && error.errors.password) {
                validationErrors.push("Username must be at least 3 characters long and Password must be at least 6 characters long");
            } else {
                if (error.errors.username) {
                    validationErrors.push(error.errors.username.message);
                }
                if (error.errors.password) {
                    validationErrors.push(error.errors.password.message);
                }
            }

            return res.status(400).json({ message: "Validation failed", errors: validationErrors });
        }

        // Return generic internal server error for other errors
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// When user login after signup
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            // If user not found, return error
            return res.status(404).json({ message: "Invalid username" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        const token = await user.generateAuthToken();

        res.cookie("jwt",token, {
            expires:new Date(Date.now() + 600000),
            httpOnly:true,
            secure: true, // Only sent over HTTPS
            sameSite: 'none' // Allows cross-origin cookies
        });
        console.log(token);
        if (isMatch) {
            // Passwords match, login successful
            console.log("successfully logined");
            return res.status(200).render("login");
        } else {
            // Passwords don't match, return error
            return res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        // Return internal server error if any error occurs
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// when user logout
exports.logout = async (req, res) => {
 
     try{

        // This will logout u from device you using only
        /*req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token !== req.token;
        });*/

        // This will logout you from all device
        req.user.tokens=[];

        // Deletion of cookie from browser's cookies storage
        res.clearCookie("jwt");
        await req.user.save();
         console.log("logout successful");
         res.redirect("/");
     }
     catch(error){
         console.error("Error in logout:", error);
         res.status(500).send(error);
     }
 
 };