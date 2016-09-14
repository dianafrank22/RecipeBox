const router = require('express').Router();
const { getUser,
		addUser,
		deleteUser } = require('../db/db');


router.get('/:id', getUser, (req,res) => {
	res.render('user/show', {user: res.rows});
});

router.post('/new', addUser, (req, res) => {
	res.redirect('/user');
});

router.delete('/:id', deleteUser, (req, res) => {
	res.redirect('/user')
})