const router       = require('express').Router();
const {
	getAllRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe } = require('../models/recipe')


router.get('/', getAllRecipes, (req,res) => {
	res.render('recipes/index', {recipes: res.rows})
})

router.get('/new',(req,res)=> {
	res.render('recipes/new')
})

//@TODO need to put in tables
// reference diversiparty
router.get('/:id', getRecipe,(req,res) =>{
	res.render('recipes/show')
})

router.post('/', getUserInfo, createRecipe, (req, res) => {
	res.json({id: res.recipe_id});
})

router.put('/:id', updateRecipe,(req,res) =>{
	// @TODO need recipe id
	// res.json({id: res.recipe_id})
})

module.exports = router;