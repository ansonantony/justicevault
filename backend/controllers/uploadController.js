// uploadController.js

const S3 = require("aws-sdk/clients/s3");
const File = require("../models/files"); // Import the File model

// Initialize AWS S3 client
const accessKeyId = "jxa6agjr5bouyhamv2i42altp4uq";
const secretAccessKey = "jze47y72ih7jenb2qbzdakzaxaqpje3tgfwef4idi2hdpabedc2we";
const endpoint = "https://gateway.storjshare.io";

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 }
});

// Function to upload a file to Storj
async function uploadFileToStorj(req, res) {
  try {
    const { username } = req.user; // Assuming user information is attached to the request after authentication
    const { file } = req.files; // Assuming file is uploaded using multipart form-data and parsed using middleware like multer

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const fileName = file.name; // Extract file name
    const fileBuffer = file.data; // Extract file data as buffer

    // Define parameters for upload
    const params = {
      Bucket: "justicevault", // Replace with your bucket name
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.mimetype // Set content type based on file mimetype
    };

    // Upload file to Storj
    const uploadResponse = await s3.upload(params, {
      partSize: 64 * 1024 * 1024 // Adjust the part size as needed
    }).promise();

    console.log("File uploaded successfully:", uploadResponse.Location);

    // Store hash value and metadata in the database
    const fileData = {
      username,
      fileName,
      fileUrl: uploadResponse.Location,
      timestamp: Date.now() // Add timestamp metadata
    };

    await File.create(fileData);

    console.log("File data stored in the database");

    return res.status(201).json({ message: 'File uploaded successfully', fileUrl: uploadResponse.Location });
  } catch (error) {
    console.error("Error uploading file to Storj:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { uploadFileToStorj };
