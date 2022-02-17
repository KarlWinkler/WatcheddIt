module.exports = function(app, dbConnection){
    require('./getMovies.js')(app, dbConnection);
    require('./getPosts.js')(app, dbConnection);
}