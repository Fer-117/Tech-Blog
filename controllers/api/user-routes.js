const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({
      where: { name: req.body.user },
    });
    console.log(userData);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    console.log(userData);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
  } catch (error) {
    {
      res.status(404).json(error).end();
    }
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log('entered signup route');

    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
