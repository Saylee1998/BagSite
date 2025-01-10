import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MONGODB CONNECTED! HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        throw error;
    }
};

export default connectDb;


