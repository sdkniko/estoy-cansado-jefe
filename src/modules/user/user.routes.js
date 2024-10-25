// routes/user.routes.js
const express = require('express');
const userService = require('./user.service');

const router = express.Router();
const app = express();
const cors = require('cors');

// Permitir CORS para todas las rutas
app.use(cors());


// GET /api/user
router.get('/api/user', async (req, res) => {
    try {
        let params = {};
        if (req.headers['params']) {
            try {
                params = JSON.parse(req.headers['params']);
            } catch (error) {
                console.log('Error parsing params header:', error);
                return res.status(400).send('Invalid params header');
            }
        }

        let paginated = await userService.paginated(params);
        return res.status(200).send(paginated);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// GET /api/user/:id
router.get('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.findOneById(userId);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// POST /api/user
router.post('/api/user', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await userService.save(newUser);
        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// PUT /api/user/:id
router.put('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await userService.update(userId, updatedUser);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// DELETE /api/user/:id
router.delete('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.remove(userId);
        return res.status(200).send('Usuario eliminado correctamente.');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;


