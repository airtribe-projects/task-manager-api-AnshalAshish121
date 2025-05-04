const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '..', 'task.json');

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// ✅ GET /api/v1/tasks?completed=true&sortBy=createdAt
router.get('/', (req, res) => {
  let tasks = readData().tasks;

  // Filter by completed
  if (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === 'true';
    tasks = tasks.filter(task => task.completed === isCompleted);
  }

  // Sort by creation date
  if (req.query.sortBy === 'createdAt') {
    tasks = tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  res.json(tasks);
});

// ✅ GET /api/v1/tasks/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = readData().tasks.find(task => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// ✅ GET /api/v1/tasks/priority/:level
router.get('/priority/:level', (req, res) => {
  const priorityLevel = req.params.level.toLowerCase();
  const tasks = readData().tasks.filter(
    task => task.priority && task.priority.toLowerCase() === priorityLevel
  );

  res.json(tasks);
});

// ✅ POST /api/v1/tasks
router.post('/', (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (
    typeof title !== 'string' || title.trim() === '' ||
    typeof description !== 'string' || description.trim() === '' ||
    typeof completed !== 'boolean' ||
    !['low', 'medium', 'high'].includes(priority)
  ) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const data = readData();
  const newTask = {
    id: data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed,
    priority,
    createdAt: new Date().toISOString()
  };

  data.tasks.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
});

// ✅ PUT /api/v1/tasks/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed, priority } = req.body;

  if (
    typeof title !== 'string' || title.trim() === '' ||
    typeof description !== 'string' || description.trim() === '' ||
    typeof completed !== 'boolean' ||
    !['low', 'medium', 'high'].includes(priority)
  ) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const data = readData();
  const taskIndex = data.tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  data.tasks[taskIndex] = {
    ...data.tasks[taskIndex],
    title,
    description,
    completed,
    priority
  };

  writeData(data);
  res.json(data.tasks[taskIndex]);
});

// ✅ DELETE /api/v1/tasks/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const index = data.tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = data.tasks.splice(index, 1)[0];
  writeData(data);

  res.json({ message: 'Task deleted', task: deletedTask });
});

module.exports = router;
