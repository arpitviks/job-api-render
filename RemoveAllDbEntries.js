require('dotenv').config();
const User = require('./models/User');
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await User.deleteMany();
        console.log('Success')
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();