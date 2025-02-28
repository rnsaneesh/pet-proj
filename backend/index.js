const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Signup = require('./models/User');

const app = express();
app.use(express.json());
const PORT = 3001;
dotenv.config();
const cors = require('cors');

// Allow requests from your Vercel domain
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));




// console.log(process.env.MONGODB_URL);

mdb
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection sucessfull");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });

app.get("/", (req, res) => {
    console.log("first")
  res.send("<h1>HIII proj</h1>");
});

app.post("/signup", async(req, res) => {
  try {
    const {firstName,lastName,userName,email,password,phoneNumber,userType} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignup = new Signup({
      firstName: firstName,
      lastName: lastName,
      userName:userName,
      email: email,
      password: hashedPassword ,
      mobile: phoneNumber,
      userType:userType
    })
    await newSignup.save();
    console.log("Signup successful");
    res.status(201).json({ message: "Signup Successful", isSignup: true });
  } catch (err) {
    console.log(err);
    res.status(201).json({ message: "Signup unsuccessful", isSignup: false });
  }
});

app.get('/getsignupdetails', async(req,res)=>{
  const signup = await Signup.find();
  console.log(signup)
  res.send("signup details fetched");
})

app.post('/login',async(req,res)=>{
  console.log("welcome to login");
  try{
    const {userName,password}=req.body;
    console.log(req.body);
    const existingUser=await Signup.findOne({userName : userName});
    console.log(existingUser);
    if(existingUser){
      const isValidpass= await bcrypt.compare(password,existingUser.password);
      console.log(isValidpass)
      if(isValidpass){
        res.status(201).json({message:"Login successful", isLogin:true})
      }
      else{
        res.status(201).json({message:"Invalid Password", isLogin:false});
      }
    }
    else{
      res.status(201).json({message:"User not found!! Signup !!", isLogin:false})
    }
  }
  catch(error){
    console.log("User not found!!! Signup First!!!")
    res.status(201).json({message:"Login error", isLogin:false})
  }
})

app.listen(PORT, () => {
  console.log("Server started successfully");
});