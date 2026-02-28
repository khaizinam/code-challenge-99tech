import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import resourceRoutes from './routes/resourceRoutes';
import * as dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './utils/errorHandler';
import { sendError } from './utils/response';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/resources', resourceRoutes);

app.get('/', (req, res) => {
    res.send('Crude Server is running!');
});

// Handle 404
app.use((req, res) => {
    sendError(res, 'Requested resource not found', 404);
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
