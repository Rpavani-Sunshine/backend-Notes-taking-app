const express = require('express');
const isAuth = require('../Middlewares/isAuth');
const NotesModel = require('../models/notesModel');

const notesRouter = express.Router();

// api to create a new note
notesRouter.post('/', isAuth, async (req, res) => {
    try {
      const note = await NotesModel.create({ 
        title: req.body.title, 
        content: req.body.content, 
        userId: req.user.userId });
      res.status(200).send({Data:note});
    } catch (error) {
      res.status(500).send({ message: "Error creating note" });
    }
  });

// api to retrieve all the notes for the authenticated user
notesRouter.get("/", isAuth, async (req, res) => {
  try {
    // pagination
    const pages = req.query.pages || 1;
    const limit = req.query.limit || 5;
    const offset = (pages - 1)*limit;
    const Notes = await NotesModel.findAll({where:{userId : req.user.userId},limit : limit, offset : offset});
    res.status(200).send({notes: Notes});
  } catch (error) {
    res.status(500).send({ message: "Error fetching notes" });
  }
});

// api  to retrieve a specific note by ID.
notesRouter.get("/:id", isAuth, async (req, res) => {
  try {
     // pagination
     const pages = req.query.pages || 1;
     const limit = req.query.limit || 5;
     const offset = (pages - 1)*limit;
    const Notes = await NotesModel.findAll({where:{userId : req.user.userId, id: req.params.id}, limit: limit, offset: offset});
    if(!Notes){
      return res.status(404).send({message:"No Notes are found"})
    }
    res.status(200).send({notes: Notes});
  } catch (error) {
    res.status(500).send({ message: "Error fetching notes" });
  }
});

// api to update a specific note by ID.
notesRouter.put('/notes/:id', isAuth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const Notes = await NotesModel.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!Notes) {
      return res.status(404).send({ message: 'Note not found' });
    }

    Notes.title = title;
    Notes.content = content;
    await Notes.save();
    
    res.status(200).send({ message: 'Note updated successfully.', Notes });
  } catch (error) {
    res.status(500).send({ message: 'Error updating note' });
  }
});

// api to delete a specific note by ID.
notesRouter.delete('/notes/:id', isAuth, async (req, res) => {
  try {
    const Notes = await NotesModel.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!Notes) {
      return res.status(404).send({ message: 'Note not found' });
    }
    await Notes.destroy();
    res.status(200).send({ message: 'Note deleted successfully.'});
  } catch (error) {
    res.status(500).send({ message: 'Error deleting note' });
  }
});


module.exports = notesRouter;