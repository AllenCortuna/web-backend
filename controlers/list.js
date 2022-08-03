import express from "express";
import mongoose from "mongoose";
import List from "../models/list.js";

const router = express.Router();

export const getLists = async (req, res) => {
  try {
    const list = await List.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOwnLists = async (req, res) => {
  const { myid } = req.params;

  try {
    const list = await List.find({ creator: myid });
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getList = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await List.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createList = async (req, res) => {
  const room = req.body;

  const newList = new List({
    ...room,
    creator: req.userId,
    updatedAt: new Date().toISOString(),
  });

  try {
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateList = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, roomStatus, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  const updatedList = {
    name,
    price,
    category,
    roomStatus,
    image,
    _id: id,
    updatedAt: new Date().toISOString(),
  };

  await List.findByIdAndUpdate(id, updatedList, { new: true });

  res.json(updatedList);
};

export const deleteList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  await List.findByIdAndRemove(id);

  res.json({ message: "List deleted successfully." });
};

export default router;
