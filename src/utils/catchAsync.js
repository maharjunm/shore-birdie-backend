const catchAsync = (fn) => (req, res) => {
  Promise.resolve(fn(req, res)).catch((err) => console.log(err));
};

module.exports = catchAsync;
