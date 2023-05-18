const router = require('express').Router();
const { json } = require('express');
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'DESC']],
    });

    const posts = blogData.map((project) => project.get({ plain: true }));

    console.log(posts);
    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('singup');
});

module.exports = router;
