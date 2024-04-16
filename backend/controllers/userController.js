const  User  = require('../models/user');
// const { recordLoginEvent } = require('../blockchain/loginAudit');
const WAValidator = require('multicoin-address-validator');
const bcrypt = require('bcrypt');
const emailvalidator = require("email-validator");
const logger = require('../middlewares/logger');
const jwt = require('jsonwebtoken');

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
      logger.info(`User ${username} registered successfully`);
      // await recordLoginEvent(userId, Date.now(), req.ip, req.headers['user-agent']);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      logger.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function loginUser(req, res) {
    try {
      const { username, walletAddress } = req.body;
  
      if (!username || !walletAddress) {
        return res.status(400).json({ error: 'Username and wallet address are required' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(walletAddress, user.walletAddress);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'hbhghghghhg', { expiresIn: '1h' });
      logger.info(`Login successful for user ${username}`);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      logger.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { registerUser, loginUser };