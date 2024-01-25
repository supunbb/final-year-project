// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import MongoDB connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Create Prisma Client instance

const app = express();

app.use(cors());
app.use(express.json());

// backend/index.js
// ... (previous code)

// API route to get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
  });
  
  // API route to create a new post
  app.post('/api/posts', async (req, res) => {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.json(post);
  });
  
  // API route to get a specific post by ID
  app.get('/api/posts/:postId', async (req, res) => {
    const postId = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    res.json(post);
  });
  
  // Similar routes can be added for updating and deleting posts
  
  // API route to get all users
  app.get('/api/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
  
  // API route to create a new user
  app.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.json(user);
  });
  
  // ... (similar routes for updating and deleting users)
  
  // ... (remaining code)
  