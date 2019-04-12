import express from 'express';
import database from './db/db';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
    res.status(200).send(
        database.getUsers()
    )
});

app.post('/api/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            success: 'false',
            message: 'Name is required'
        });
    }

    let user = req.body
    user = database.createUser(user)

    return res.status(200).send({
        user
    })
});

app.put('/api/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: 'Name is required'
        });
    }
    if (!req.body.id) {
        return res.status(400).send({
            message: 'Id is required'
        });
    }

    let user = req.body
    user = database.editUser(user)

    if (user) {
        return res.status(200).send({
            user
        })
    } else {
        return res.status(404).send({
            message: 'User not found',
        })
    }
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    let result = database.deleteUser(id)
    if (result) {
        return res.status(200).send();
    } else {
        return res.status(404).send({
            message: 'User not found',
        });
    }
});

module.exports = app