const db = require('../db/db')

// 	updateRecipe,
// 	deleteRecipe,
// 	searchRecipes,
// 	searchResults
// getRecipesFromPinterest

function getAllRecipes(req, res, next){
	db.any('SELECT * FROM recipes INNER JOIN users on recipes.user_id =users.user_id')
	.then( data => {
		res.rows = data;
		next();
	}).catch( error => {
		console.log('Error ', error)
	});
}

function getRecipe(req, res, next){
	db.one('SELECT * FROM recipes INNER JOIN users on recipes.user_id = users.user_id WHERE recipe_id=$1', [req.params.id])
	.then( data => {
		res.row = data;
		next();
	}).catch( error => {
		console.log('Error ', error)
	})
}

function createRecipe(req,res, next){
	db.none('INSERT INTO recipes (recipe_name, image_url, description, type, user_id )',
		[ req.body.name,
		  req.body.image,
		  req.body.description,
		  req.body.type,
		  req.body.userId
		]).then(data => {
			console.log('recipe created')
			next();
		}).catch( error => {
			console.log('Error ', error)
		})
}

function getRecipesFromPinterest(username, boardname, recipe_type){
	return function(dispatch){
		fetch("https://api.pinterest.com/v1/"+username+"/"+boardname+"/pins/", {
			method: 'GET',
			headers: {

			},
		}).then((response) => {
			if(response.status >= 400){
				reject(new Error('Bad response from server!'));
			}
			response.text().then((body)=>{
				// parse data here
			})
		})
	}
}

module.exports = {
	getAllRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
	searchRecipes
	 };