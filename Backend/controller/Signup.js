const Signup = require("../model/Signup");

const Login=require("../model/Login")

exports.Signup = async (req, res) => {

   
    try {
        const { fname,lname, password, email } = req.body;

        // Check if user already exists
        const exist = await Signup.findOne({ email:email });
        if (exist) {
          
            res.json("exist")
        } else {
           // If user does not exist, create new user
            const respo = await Signup.create({
                fname,
                lname,
                email,
                password,
              
            });
            return res.status(200).json({
                success: true,
                data: respo,
                message: 'user registered successfully'
            });
           
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).send({ result: "Internal server error" });
    }
};
