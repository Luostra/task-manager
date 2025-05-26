const Task = require('../models/Task');

// Создать задачу
exports.createTask = async (req, res) => {
  try {
    const { title, description, rating, deadline, tags } = req.body;

    // Простая валидация формата строки даты
    /*
    if (deadline && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(deadline)) {
      return res.status(400).json({ 
        message: 'Invalid deadline format. Use ISO format (YYYY-MM-DDTHH:MM:SS)' 
      });
    }*/

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      rating,
      deadline, // Сохраняем как строку
      tags
    });
    
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Получить все задачи пользователя
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Получить задачу по ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.getById(req.user.id, req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Обновить задачу
exports.updateTask = async (req, res) => {
  try {
    const { title, description, is_completed, rating, deadline, tags } = req.body;
    const task = await Task.update(req.user.id, req.params.id, {
      title,
      description,
      is_completed,
      rating,
      deadline,
      tags
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Удалить задачу
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.delete(req.user.id, req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Переключить статус выполнения
exports.toggleComplete = async (req, res) => {
  try {
    const task = await Task.toggleComplete(req.user.id, req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Получить задачи с приближающимся дедлайном
exports.getUpcomingTasks = async (req, res) => {
  try {
    const days = req.query.days || 3;
    const tasks = await Task.getUpcomingDeadlines(req.user.id, days);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};