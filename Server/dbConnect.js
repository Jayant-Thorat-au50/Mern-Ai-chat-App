import mongoose from "mongoose";


const dbConnect = async () => {
    try {

        console.log(process.env.mongoDb_Uri);
        
      const dbConnection = await mongoose.connect(process.env.mongoDb_Uri)
      if(dbConnection) console.log('connected to mongodb');
      
    } catch (error) {
        console.log(error);
        
    }
}

export default dbConnect;