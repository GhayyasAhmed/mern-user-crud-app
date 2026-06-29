import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/Users';


const PORT = 3001;
// const MONGO_URI = 'mongodb://localhost:27017/crud-backend';
// continue at 18:22 mint
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crud-backend').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


app.get('/api/users', async (req, res) => {
    const users = await User.find();
    const usersWithoutVersion = users.map((user) => {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            age: user.age
        }
    });
    res.status(200).json({
        message: 'Users fetched successfully',
        data: usersWithoutVersion,
        success: true,
        status: 200
    });
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found", status: 404 })
    }
    const usersWithoutVersion = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        age: user.age
    }
    res.status(200).json({
        message: 'User fetched successfully',
        data: usersWithoutVersion,
        success: true,
        status: 200
    });
});

app.patch('/api/users/:id',async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, age });
    if (!user) {
        return res.status(404).json({ error: "User not found", status: 404 })
    }
    const usersWithoutVersion = {
        id: user._id.toString(),
        name,
        email,
        age
    }
    res.status(200).json({
        message: 'User updated successfully',
        data: usersWithoutVersion,
        success: true,
        status: 200
    });
});


app.delete('/api/users/:id',async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).json({ error: "User not found", status: 404 })
    }
    res.status(200).json({
        message: 'User deleted successfully',
        success: true,
        status: 200
    });
});

app.post('/api/users', async (req, res) => {
    const { name, email, age } = req.body;
    await User.create({ name, email, age })
        .then((user) => {
            res.status(201).json({ message: 'User created successfully', data: user });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error creating user', error: err });
        });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});