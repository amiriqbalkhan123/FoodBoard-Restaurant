require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected');

    const existingAdmin = await User.findOne({
      username: 'admin',
    });

    if (existingAdmin) {
      console.log('Admin already exists');

      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      'admin123',
      10
    );

    await User.create({
      username: 'admin',
      email: 'admin@foodboard.com',
      password: hashedPassword,
      isVerified: true,
    });

    console.log('Admin user created successfully');

    console.log('Username: admin');
    console.log('Password: admin123');

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

createAdmin();