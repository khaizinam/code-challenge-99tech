import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import resourceRoutes from './routes/resourceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/resources', resourceRoutes);

app.get('/', (req, res) => {
  res.send('Crude Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
