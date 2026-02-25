import bcrypt from "bcrypt";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password,role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash: hash,
      role: role || "user",
    });

    res.status(201)
      .json({ message: "User registered", userId: user.id, email: user.email });
  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message: "Missing fields"});
    }

    const user  =  await User.findOne({where:{email}} );

    if(!user){
      return res.status(400).json({message: "Invalid credentials"});
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if(!match){
      return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign(
      {id: user.id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );

    res.json({token}) ;
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};