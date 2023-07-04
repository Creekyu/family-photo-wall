const OSSClient = require('../utils/OSSClient');
const Image = require('../models/imgModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const filterObj = require('../utils/filterObj');

// controllers
exports.addPhotos = catchAsync(async (req, res) => {
  const imgs = await Image.create(
    req.body.map((img) => {
      return {
        filename: img.filename,
        classification: img.classification,
        photoTime: img.photoTime,
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

exports.getCount = catchAsync(async (req, res) => {
  const { classification } = req.query;
  const count = await Image.count({ classification });
  res.status(200).json({
    status: 'success',
    data: {
      count,
    },
  });
});

exports.delSingle = catchAsync(async (req, res) => {
  const { filename } = req.body;
  const client = await OSSClient.getOSSClient();
  await client.delete(filename, { quiet: true });
  await Image.deleteOne({ filename: req.body.filename });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.delMany = catchAsync(async (req, res) => {
  const { fileList } = req.body;
  const client = await OSSClient.getOSSClient();
  await client.deleteMulti(fileList, { quiet: true });
  // 批量删除
  await Image.deleteMany({ filename: { $in: fileList } });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateClass = catchAsync(async (req, res, next) => {
  const { fileList } = req.body;
  const filteredBody = filterObj(req.body, 'classification');
  const updatedList = await Image.updateMany(
    { filename: { $in: fileList } },
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      updatedList,
    },
  });
});
