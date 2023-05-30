const OSS = require('ali-oss');
const Image = require('../models/imgModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// OSS
const client = new OSS({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  bucket: process.env.BUCKET,
});

exports.addPhotos = catchAsync(async (req, res) => {
  const imgs = await Image.create(
    req.body.map((img) => {
      return {
        filename: img.filename,
        classification: img.classification,
      };
    })
  );

  res.status(201).json({
    status: 'success',
    data: [imgs],
  });
});

exports.getPhotos = catchAsync(async (req, res) => {
  const features = new APIFeatures(Image.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const images = await features.query;
  res.status(200).json({
    status: 'success',
    data: {
      images,
    },
  });
});
