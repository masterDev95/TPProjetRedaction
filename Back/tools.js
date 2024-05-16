const fs = require('fs');

// Envoi le contenu d'un fichier json 
exports.SendFileContent= async(jsonFile, res,status)=>  {
  fs.readFile(jsonFile, 'utf-8', (err, data) => {
    if (data) {
      if(jsonFile.endsWith('.json'))
        res.status(status).json(JSON.parse(data));
    } else {
      res.status(500).json({"Error": "Internal Server Error" ,"Message": err.message});
    }
  });
}
