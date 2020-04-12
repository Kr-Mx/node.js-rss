class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { status, message } = err;
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(message);
};

module.exports = {
  ErrorHandler,
  handleError
};
