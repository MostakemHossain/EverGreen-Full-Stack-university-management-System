import cors from 'cors';
import express from 'express';
import { StudentRoutes } from './app/modules/student/student.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Hello world',
  });
});

export default app;
