import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import messageRoute from  './routes/message.js'


const port = process.env.PORT || 8000;
dotenv.config();

const app = express();
app.use(express.json());


const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected")
    } catch (err) {
        console.log(err)
    }

}

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    dbConnect();
})
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
app.use('/api', userRoute);
app.use('./api',messageRoute);

