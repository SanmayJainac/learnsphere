import mongoose from 'mongoose';

//connect to the database

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB Connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/lmslearnsphere`)
}
export default connectDB