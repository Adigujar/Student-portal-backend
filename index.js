const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");

const router = express();
router.use(express.json());
router.use(cors());
dotenv.config();

const mongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3000;
const DB_URL = "mongodb+srv://adigujar:12345@cluster0.j3tiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"




router.post('/user', async(req, res) => {
    try {
        let client = await mongoClient.connect(DB_URL)
        let db = client.db("students-portal");
        let user_details =await db.collection("useracess").find({user:req.body.user}).toArray()
        res.json(user_details[0].assignments)
        client.close()
        
    } catch (error) {
        res.json({
            message:"Someting Went Worng"})
        
    }
})


router.post("/login", async (req, res) => {
  try {
    const client = await mongoClient.connect(DB_URL);
    const db =  client.db("students-portal");
    const result = await db.collection('useracess').find({user:req.body.user}).toArray();
    if(req.body.pass==result[0].pass){
      
        return res.json({message:"Welcome"});
    }else{
        res.status(200).json({message: " worng user/password or invalid user"})
    }
    
    client.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } 
});

router.post('/send', async(req, res) => {
  try {
      let client = await mongoClient.connect(DB_URL)
      let db = client.db("students-portal");
      let user_details =await db.collection("useracess").updateOne({user:req.body.user},{$push:{assignments:{id:req.body.id,Assignment_name:req.body.Assignment_name,gitlink:req.body.gitlink}}})
      client.close()
      
  } catch (error) {
      res.json({
          message:"Someting Went Worng"})
      
  }
})



router.listen(port, () =>
  console.log(`::: Server is UP and running wonderfully ::: ${port}`)
);