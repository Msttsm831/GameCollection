// controllers/games.js

const express = require('express');

const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    // find the user
    const currentUser = await User.findById(req.session.user._id);

    res.render('games/index.ejs', {
      games: currentUser.games,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('games/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    // find the user
    const currentUser = await User.findById(req.session.user._id);
    // add the game to the games array on the user object
    currentUser.games.push(req.body);
    // save the changes to the user record.
    await currentUser.save();
    // redirect user to index page
    res.redirect(`/users/${currentUser._id}/games`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:gameId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the game by the gameId supplied from req.params
    const game = currentUser.games.id(req.params.gameId);
    // Render the show view, passing the game data in the context object
    res.render('games/show.ejs', {
      game,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:gameId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // a game using the id supplied from req.params
    currentUser.games.id(req.params.gameId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the games index view
    res.redirect(`/users/${currentUser._id}/games`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

// EDIT
router.get('/:gameId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const game = currentUser.games.id(req.params.gameId);
    res.render('games/edit.ejs', {
      game,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:gameId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current game from the id supplied by req.params
    const game = currentUser.games.id(req.params.gameId);
    // Use the Mongoose .set() method
    // this method updates the current game to reflect the new form
    // data on `req.body`
    game.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current game
    res.redirect(`/users/${currentUser._id}/games/${req.params.gameId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
