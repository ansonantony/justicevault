const  User  = require('../models/user');
const WAValidator = require('multicoin-address-validator');
const bcrypt = require('bcrypt');
const emailvalidator = require("email-validator");

async function registerUser(req, res) {
    try {
      const { username, positionInCourt, email, walletAddress } = req.body;

      if (!username || !positionInCourt || !email || !walletAddress) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      if (!emailvalidator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      if (!WAValidator.validate(walletAddress, 'BTC')) {
        return res.status(400).json({ error: 'Invalid wallet address' });
      }

      const hashedWalletAddress = await bcrypt.hash(walletAddress, 10);

      const user = new User({
        username,
        positionInCourt,
        email,
        walletAddress: hashedWalletAddress
      });

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = { registerUser };

