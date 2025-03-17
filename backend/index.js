const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Signup = require('./models/User');
const Pet=require("./models/Pet");
const Request=require("./models/Requests");
const QuizResponse = require("./models/QuizResponse");

const app = express();
app.use(express.json());
const PORT = 3001;
dotenv.config();
const cors = require('cors');

// Allow requests from your Vercel domain
const corsOptions = {
  origin: ['https://pet-proj-three.vercel.app','http://localhost:5173'],
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

app.get("/getUserProfile", async (req, res) => {
  try {
    const { userName } = req.query; // Ensure query params work

    if (!userName) {
      return res.status(400).json({ message: "Username required" });
    }

    const user = await Signup.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let quizResponses = [];
    if (user.userType === "customer") {
      quizResponses = await QuizResponse.find({ userName });
    }

    res.status(200).json({
      userName: user.userName,
      userType: user.userType,
      email: user.email,
      organizationName: user.organizationName || null,
      quizResponses,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});



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


app.get("/getUserType", async (req, res) => {
  const { userName } = req.query; 
  if (!userName) {
    return res.status(400).json({ message: "Username required", isLogin: false, userType: null });
  }

  try {
    const user = await Signup.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found", isLogin: false, userType: null });
    }

    res.status(200).json({ isLogin: true, userType: user.userType });
  } catch (error) {
    console.error("Error fetching user type:", error);
    res.status(500).json({ message: "Server error", isLogin: false, userType: null });
  }
  
});

//pet enteries
app.post("/petadd", async (req, res) => {
  try {
    const { petName, petType, breed, age, OrgName,additionalInfo } = req.body;

    if (!petName || !petType || !breed || !age || !OrgName) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newPet = new Pet({
      petName,
      petType,
      breed,
      age,
      OrgName,
      additionalInfo,
    });

    await newPet.save();
    res.status(201).json({ message: "Pet added successfully!" });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Server error, try again later!" });
  }
});

app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/pet/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    console.error("Error fetching pet details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/request', async (req, res) => {
  const { petId, userName, petName } = req.body;

  if (!petId || !userName || !petName) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  const existingRequest = await Request.findOne({ petId, userName });
  if (existingRequest) {
    return res.status(400).send("You have already requested this pet!");
  }

  const newRequest = new Request({ petId,userName,petName});
  await newRequest.save();
  res.send("Request sent successfully!");
});

app.get("/getrequest", async (req, res) => {
  try {
    const requests = await Request.find().sort({ _id: -1 });

    if (!requests.length) {
      return res.status(404).json({ message: "No adoption requests found." });
    }

    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/updateRequest/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/saveQuizResponse", async (req, res) => {
  try {
    const { userName, userType, responses } = req.body;

    if (userType !== "customer") {
      return res.status(400).json({ message: "Only customers can take the quiz." });
    }

    const newQuizResponse = new QuizResponse({ userName, userType, responses });
    await newQuizResponse.save();

    res.status(201).json({ message: "Quiz response saved successfully!" });
  } catch (error) {
    console.error("Error saving quiz response:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log("Server started successfully");
});