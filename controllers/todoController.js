const Todo = require('../models/Todo');

exports.create = async (req, res) => {
    const { title, completed } = req.body;

    try {
        const todo = new Todo({
            title,
            completed,
            userId: req.user._id
        });
        const savedTodo = await todo.save();
        res.send(savedTodo);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAll = async (req, res) => {
    const { filter } = req.query;
    let todos;

    try {
        if (filter === 'completed') {
            todos = await Todo.find({ userId: req.user._id, completed: true });
        } else if (filter === 'incomplete') {
            todos = await Todo.find({ userId: req.user._id, completed: false });
        } else {
            todos = await Todo.find({ userId: req.user._id });
        }
        res.send(todos);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { title, completed },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).send('Todo not found');
        res.send(updatedTodo);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!deletedTodo) return res.status(404).send('Todo not found');
        res.send('Todo deleted successfully');
    } catch (err) {
        res.status(400).send(err);
    }
};
