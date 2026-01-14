import z, { ZodError } from 'zod';

export const inputValidationMiddleware = (source, schema) => {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const parsedData = schema.parse(dataToValidate);
      req[source] = parsedData;

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.dir(z.treeifyError(error), { depth: 3 });

        return res.status(400).json({ message: 'Validation error' });
      }

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
