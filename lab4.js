// Обробник запиту для отримання списку todo користувача
const assert = require('assert');
const axios = require('axios');
const app = require('./app');

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

// Обробник запиту для створення todo користувача
app.post('/users/:userId/todos', logRequest, async (req, res) => {
    try {
        const userId = req.params.userId;
        const todoData = req.body;

        const response = await axios.post(`${API_URL}/users/${userId}/todos, todoData`);

        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// middleware для збору статистики з кожного запиту
function logRequest(req, res, next) {
    const routeParams = req.params;
    const queryParams = req.query;

    const requestStats = {
        routeParams,
        queryParams
    };

    console.log(requestStats);

    next();
}

// Старт сервера
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

