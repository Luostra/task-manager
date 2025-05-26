const pool = require('../db');

class Task {
static async create({ userId, title, description, rating, deadline, tags }) {
  const query = `
    INSERT INTO tasks 
      (user_id, title, description, rating, deadline, tags)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  
  const values = [
    userId,
    title,
    description,
    rating,
    deadline, // Теперь принимаем как строку
    tags || []
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

  static async getAllByUser(userId) {
    const query = `
      SELECT * FROM tasks 
      WHERE user_id = $1
      ORDER BY deadline ASC NULLS LAST
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getById(userId, taskId) {
    const query = `
      SELECT * FROM tasks 
      WHERE user_id = $1 AND id = $2
    `;
    const result = await pool.query(query, [userId, taskId]);
    return result.rows[0];
  }

  static async update(userId, taskId, { title, description, is_completed, rating, deadline, tags }) {
    const query = `
      UPDATE tasks 
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        is_completed = COALESCE($3, is_completed),
        rating = COALESCE($4, rating),
        deadline = COALESCE($5, deadline),
        tags = COALESCE($6, tags)
      WHERE id = $7 AND user_id = $8
      RETURNING *
    `;
    const values = [
      title, 
      description, 
      is_completed, 
      rating, 
      deadline, 
      tags, 
      taskId, 
      userId
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(userId, taskId) {
    const query = `
      DELETE FROM tasks 
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [taskId, userId]);
    return result.rows[0];
  }

  static async toggleComplete(userId, taskId) {
    const query = `
      UPDATE tasks 
      SET is_completed = NOT is_completed
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [taskId, userId]);
    return result.rows[0];
  }

  // Новый метод для получения задач с истекающим сроком
  static async getUpcomingDeadlines(userId, days = 3) {
    const query = `
      SELECT * FROM tasks
      WHERE user_id = $1 
        AND is_completed = FALSE
        AND deadline BETWEEN NOW() AND NOW() + INTERVAL '${days} days'
      ORDER BY deadline ASC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = Task;