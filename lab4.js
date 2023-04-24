const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const API_URL = 'https://gorest.co.in/public/v2';


app.use(express.json());


function logRequest(req, res, next) {
  const routeParams = req.params;
  const queryParams = req.query;

  const requestStats = {
    routeParams: { ...routeParams },
    queryParams: { ...queryParams },
  };

  console.log(requestStats);

  next();
}

// отримання списку todo користувача
app.get('/users/:userId/todos', logRequest, async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axios.get(`${API_URL}/users/${userId}/todos`);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//створення todo користувача
app.post('/users/:userId/todos', logRequest, async (req, res) => {
  try {
    const userId = req.params.userId;
    const todoData = req.body;

    const response = await axios.post(
      `${API_URL}/users/${userId}/todos`,
      todoData
    );

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
