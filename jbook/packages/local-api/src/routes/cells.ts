import express from 'express';
export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // Make sure the cell storage file exists
    // if not create it
    //read the file
    // parse a list of cells out of it
    // Send list of cells back to the browser
  });
  router.post('/cells', async (req, res) => {
    // Make sure the file exists
    // if not create it
    // Take the list of cells from request object
    // serialize them
    // write the cells into the file
  });
  return router;
};
