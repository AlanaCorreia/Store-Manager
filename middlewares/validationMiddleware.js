const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (typeof name !== 'string' || name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateQuantitySale = (req, res, next) => {
  const request = req.body;

  request.forEach(({ quantity }) => {
    if (quantity === undefined || quantity === null) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  next();
};

const validateProductId = (req, res, next) => {
  const { productId } = req.body;

  if (productId === undefined) return res.status(400).json({ message: '"productId" is required' });

  next();
};

module.exports = { validateName, validateQuantity, validateProductId, validateQuantitySale };