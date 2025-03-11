import express from 'express';

const app = express();
app.use(express.json());

app.post('/createContributor', (req, res) => {
  res.status(503);
  res.send('Not implemented yet');
});

app.post('/createProject', (req, res) => {
  res.status(503);
  res.send('Not implemented yet');
});

app.post('/editContributor/:id', (req, res) => {
  res.status(503);
  res.send('Not implemented yet');
});

app.post('/editProject/:id', (req, res) => {
  res.status(503);
  res.send('Not implemented yet');
});

app.post('updateMatches', (req, res) => {
  res.status(503);
  res.send('Not implemented yet');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
