import { Request, Response } from "express";
import prisma from "../prisma/client";

// CREATE TASK
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req as any).userId;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};
// GET ALL TASKS (with pagination, filter, search)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const { page = "1", limit = "10", search = "", completed } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const where: any = {
      userId,
      title: {
        contains: search as string,
        mode: "insensitive"
      }
    };

    if (completed !== undefined) {
      where.completed = completed === "true";
    }

    const tasks = await prisma.task.findMany({
      where,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy: {
        createdAt: "desc"
      }
    });

    const total = await prisma.task.count({ where });

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
// GET SINGLE TASK
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};
// UPDATE TASK
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;
    const { title, description } = req.body;

    const task = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description
      }
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};
// DELETE TASK
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;

    const task = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// TOGGLE TASK COMPLETION
export const toggleTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;

    const task = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        completed: !task.completed
      }
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle task" });
  }
};
