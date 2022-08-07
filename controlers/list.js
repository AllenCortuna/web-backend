import express from "express";
import mongoose from "mongoose";
import List from "../models/list.js";

const router = express.Router();

// MARK:
export const getLists = async (req, res) => {
  try {
    const list = await List.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// MARK:
export const getOwnLists = async (req, res) => {
  const { myid } = req.params; //myid must be in routes params
  try {
    const list = await List.find({ creator: myid });
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// MARK:
export const getList = async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id);
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// MARK:
export const createList = async (req, res) => {
  const list = req.body;

  const newList = new List({
    ...list,
    creator: req.userId,
    // updatedAt: new Date().toISOString(),
  });

  try {
    await newList.save();
    res.status(201).json(newList);
    console.log("create ok");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// MARK:
export const updateList = async (req, res) => {
  const { id } = req.params;
  const { name, price, detail } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No list with id: ${id}`);

  const updatedList = {
    name,
    price,
    detail,
    _id: id,
    updatedAt: new Date().toISOString(),
  };

  await List.findByIdAndUpdate(id, updatedList, { new: true });

  res.json(updatedList);
};

// MARK:
export const deleteList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No list with id: ${id}`);

  await List.findByIdAndRemove(id);

  res.json({ message: "List deleted successfully." });
};

// MARK:
export const getListsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const lists = await List.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: lists });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
