const Image = require('../models/imgModel');
const catchAsync = require('../utils/catchAsync');

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
