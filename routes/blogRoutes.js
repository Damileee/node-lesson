const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');


// blog routes
// get all blogs from the database and render them
router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render('404', { title: 'Blog not found' });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
// This file defines the routes for handling blog-related requests, including creating, reading, and deleting blogs. It uses Express Router to modularize the routes and interact with the Blog model for database operations.