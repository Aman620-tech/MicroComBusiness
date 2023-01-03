const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});
let uploadS3 = async (fileContent, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };
  const uploadFile = await S3.upload(params).promise();
  // console.log("uploadFile", uploadFile);

  return uploadFile;
};

let deleteObject = async (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName, //if any sub folder-> path/of/the/folder.ext
  };
  try {
    const file = await S3.headObject(params).promise();
    // console.log("File Found in S3", file);
    try {
      const del = await S3.deleteObject(params).promise();
      console.log("file deleted Successfully", del);
      return del;
    } catch (err) {
      console.log("ERROR in file Deleting : " + JSON.stringify(err));
    }
  } catch (err) {
    console.log("File not Found ERROR : " + err.code);
  }
};

module.exports = { uploadS3, deleteObject };
