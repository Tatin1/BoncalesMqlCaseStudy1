const User = require('../Models/User');
const bcrypt = require('bcrypt');

// UserController
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ user: updatedUser, message: 'User updated successfully' });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };