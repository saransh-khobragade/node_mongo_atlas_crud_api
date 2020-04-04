const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saransh98:12345@cluster0-7pbxe.gcp.mongodb.net/test?retryWrites=true&w=majority";
const db_name = "test_database"

module.exports = {
  connectToServer: function( ) {
    return new Promise((resolve,reject)=>{
        MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
            if(!err){
                return resolve({client,db:client.db(db_name)});
            }
            reject( err );
        });
    });
  	
  }, 
  closeConnection:async (client) => {
      try{
        client.close();
        return true;
      }catch(e){
        throw new Error(e.message);
      }
  }
};

