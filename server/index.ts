import path from 'path';
import express, {Request, Response} from 'express';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use((req: Request, res: Response) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
