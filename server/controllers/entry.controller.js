import Entry from "../models/Entry.js";
import User from "../models/User.js";

export const createEntry = async (req, res, next) => {
  try {
    const entry = new Entry(req.body);
    const savedEntry = await entry.save();

    await User.findByIdAndUpdate(savedEntry.author, {
      $push: { entries: savedEntry._id },
    });

    res.status(201).json(savedEntry);
  } catch (err) {
    next(err);
  }
};

export const updateEntry = async (req, res, next) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedEntry);
  } catch (err) {
    next(err);
  }
};

export const deleteEntry = async (req, res, next) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);

    await User.findOneAndUpdate(
      { entries: req.params.id },
      { $pull: { entries: req.params.id } }
    );

    res.status(200).json("Entry deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getEntries = async (req, res, next) => {
  try {
    const entries = await Entry.find({ author: req.params.userId });
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

export const getEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);
    res.status(200).json(entry);
  } catch (err) {
    next(err);
  }
};