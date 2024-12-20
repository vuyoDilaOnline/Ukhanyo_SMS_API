const User = require('../models/user_model');


exports.createUser = async (req, res) => {
    try {
        if(!req.body){
            return res.json({message: "Form fields cannot be empty!!!"})
        }
        const user = new User({...req.body});

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
}


exports.getUserById = async (req, res) => {
    try {
        const userId  = req.params.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const  userId  = req.params.id;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {...req.body},
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
}
