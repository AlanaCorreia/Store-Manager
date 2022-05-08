const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ Error: err.message });
  return res.status(500).json({ Error: 'Internal Server Error' });
};

module.exports = { errorMiddleware };