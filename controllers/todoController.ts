// src/controllers/todoController.ts
import { Request, Response } from 'express';
<<<<<<< HEAD
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
=======
>>>>>>> origin/main

interface Task {
    id: number;
    title: string;
}

<<<<<<< HEAD
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = await open({
            filename: '../mydatabase.sqlite', // Path to your SQLite database file
            driver: sqlite3.Database,
        });

        const tasks = await db.all<Task[]>('SELECT * FROM tasks');
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;

        const db = await open({
            filename: '../mydatabase.sqlite', // Path to your SQLite database file
            driver: sqlite3.Database,
        });

        const { lastID } = await db.run('INSERT INTO tasks (title) VALUES (?)', [title]);

        const newTask: Task = { id: lastID, title };
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Implement updateTask and deleteTask similarly
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = parseInt(req.params.id);
        const { title } = req.body;

        const db = await open({
            filename: '../mydatabase.sqlite', // Path to your SQLite database file
            driver: sqlite3.Database,
        });

        const result = await db.run('UPDATE tasks SET title = ? WHERE id = ?', [title, taskId]);

        if (result.changes === 0) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = parseInt(req.params.id);

        const db = await open({
            filename: '../mydatabase.sqlite', // Path to your SQLite database file
            driver: sqlite3.Database,
        });

        const result = await db.run('DELETE FROM tasks WHERE id = ?', [taskId]);

        if (result.changes === 0) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
=======
const tasks: Task[] = [];

export const getTasks = (req: Request, res: Response): void => {
    res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
    const { title } = req.body;
    const id = tasks.length + 1;
    const newTask: Task = { id, title };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
};

export const updateTask = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);
    const { title } = req.body;

    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    taskToUpdate.title = title;
    res.json({ message: 'Task updated successfully', task: taskToUpdate });
};

export const deleteTask = (req: Request, res: Response): void => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' });
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully', deletedTask });
};
>>>>>>> origin/main
