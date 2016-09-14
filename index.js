'user strict'
var express    = require('express');
var router     = express.Router();
var pg         = require('pg-promise')({});
var bodyParser = require('body-parser');
var user       = process.env.PG_USER;
var password   = process.env.PG_PASSWORD;
var port       = process.env.PORT || 3000;
var app        = express();


const pgConfig = {
	host: process.env.PG_HOST,
	port: process.env.PORT,
	database: 'recipes',
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD
}

// const db       = pg(pgConfig);





app.listen(port, () => {
  console.log('Server is listening on port', port);
})

pg.connect(pgConfig, function(err, user, done){
	if(err){
		return console.error('error fetching client from pool', err)
	}
	user.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err, result){
		done()

		if(err){
			return console.error('error happened during query', err)
		}
	console.log(result.rows[0])
	process.exit
	})
})


app.post('/users', function(req, res, next){
	const user = req.body

	pg.connect(pgConfig, function(err, user, done){
		if(err){
			return next(err)
		}
		user.query('INSERT INTO users (name, password) VALUES ($1, $2);', [user.username, user.password], function(err,result){
			done()
			if(err){
				return next(err)
			}
			res.send(200)
		})
	})
})

app.get('/users', function (req, res, next){
	pg.connect(pgConfig, function(err, user, done){
		if(err){
			return next(err)
		}
		user.query('SELECT name FROM users;',[] function(err, result){
			done()
			if(err){
				return next(err)
			}
			res.json(result.rows)
		})
	})
})

// post users
// get users

// add recipes
// delete recipes
// update recipes with favorite

// app.post('/users', function(req,res,next) {
//   db.none(`INSERT INTO users (username, password)
//            VALUES 
//            ($1, $2);`,
//           [req.body.username, req.body.password])
//     .then( data => {
//       console.log('Successfully added new entry');
//       next();
//     })
//     .catch( error => {
//       console.log('Error ', error);
//     });
// })



// app.post('/users', function(req, res, next){
// 	const user = req.body
// 	pg.connect(pgConfig, function(err, client, done){
// 		if(err){
// 			return next(err)
// 		}
// 		client.query('INSERT INTO users (username, password) VALUES ($1, $2);', [user.username, user.password], function(err, result){
// 			done()

// 			if(err){
// 				return next(err)
// 			}
// 			res.send(200)
// 		})
// 	})

// })

// app.get('/users', function(req, res, next){
// 	pg.connect(pgConfig, function(err, client, done){
// 		if(err){
// 			return next(err)
// 		}
// 		client.query('SELECT name, age FROM users;', [], function(err, result){
// 			done()
// 			if(err){
// 				return next(err)
// 			}

// 			res.json(result.rows)
// 		})
// 	})
// })

