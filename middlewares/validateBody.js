const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    // if (Object.keys(req.body).length === 0) {
    //   next(HttpError(400, 'missing fields'));
    //   return
    // } 
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
