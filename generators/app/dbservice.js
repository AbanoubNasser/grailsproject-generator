var mySQL = require('mysql');
var constants = require('./generator-constants');
var passwordgenerator = require('generate-password');
module.exports = {
    createDB,
    createDbUser
};
/**
 * Create database on db server.
 * @param                 generator.
 */
function createDB(generator){
    console.log("Create DB....");
    var self=this;
    var con = mySQL.createConnection({
        host: constants.dbConfig.HOST,
        user: constants.dbConfig.USER,
        password: constants.dbConfig.PASSWORD
      });
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var dbName=new String(generator.projectName).replace(/-/g,'');
        con.query("CREATE DATABASE "+dbName, function (err, result) {
          if (err){
            throw err;
          }else{
            console.log("Database created");
           self.createDbUser(con);
          }
        });
      });
}

/**
 * Create database user.
 * @param       connection
 */
function createDbUser(con){
  var passwords = passwordgenerator.generateMultiple(2, {length: 10,uppercase: false});
  con.query('GRANT ALL PRIVILEGES ON *.* TO \''+passwords[0]+'\'@\'localhost\' IDENTIFIED BY \''+passwords[1]+'\'',function(err,result){
    if (err){
      throw err;
    }else{
      console.log("Database user has been created successfully");
      console.log("DB username : "+passwords[0]);
      console.log("DB password : "+passwords[1]);
    }
});
}