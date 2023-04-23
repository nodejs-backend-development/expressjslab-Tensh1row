const assert = require('assert');
const axios = require('axios');
const app = require('./app');

describe('GET /users/:userId/todos', () => {
    it('should return a list of todos for a user', async () => {
        // Arrange
        const userId = 1;
        const expectedTodoList = [
            {
                "id": 1,
                "user_id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "id": 2,
                "user_id": 1,
                "title": "quis ut nam facilis et officia qui",
                "completed": false
            },
            // Add more expected todos here
        ];

        // Act
        const response = await axios.get(`http://localhost:3000/users/${userId}/todos`);

        // Assert
        assert.deepStrictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, expectedTodoList);
    });

    it('should return 500 Internal Server Error if there is an error with the request', async () => {
        // Arrange
        const userId = 999; // invalid user ID

        // Act
        const response = await axios.get(`http://localhost:3000/users/${userId}/todos`);

        // Assert
        assert.deepStrictEqual(response.status, 500);
        assert.deepStrictEqual(response.data, 'Internal Server Error');
    });
});

describe('POST /users/:userId/todos', () => {
    it('should create a new todo for a user', async () => {
        // Arrange
        const userId = 1;
        const todoData = {
            title: 'test todo',
            completed: false
        };

        // Act
        const response = await axios.post(`http://localhost:3000/users/${userId}/todos`, todoData);

        // Assert
        assert.deepStrictEqual(response.status, 200);
        assert.deepStrictEqual(response.data.title, todoData.title);
        assert.deepStrictEqual(response.data.completed, todoData.completed);
    });

    it('should return 500 Internal Server Error if there is an error with the request', async () => {
        // Arrange
        const userId = 999; // invalid user ID
        const todoData = {
            title: 'test todo',
            completed: false
        };

        // Act
        const response = await axios.post(`http://localhost:3000/users/${userId}/todos`, todoData);

        // Assert
        assert.deepStrictEqual(response.status, 500);
        assert.deepStrictEqual(response.data, 'Internal Server Error');
    });
});
