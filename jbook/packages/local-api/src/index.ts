import express from 'express';
const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
export { serve };
