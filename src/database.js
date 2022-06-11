const {Client} = require('pg')
let client;

client = new Client ({
  host: "eec2-34-225-159-178.compute-1.amazonaws.com",
  user: "tbrfluygrahlkn",
  port: 5432,
  password: "af783558cfc0452c0cb9e6591a58fe8dc7b710363e6b379f76c51e9a2f953e75",
  database: "da6ab7an1qineq",
  ssl: true
})

client.connect();

exports.client = client;


/*
//INSERT INTO WALLET_INFO(user_id, wallet_address, wallet_private_key) VALUES (554,'02323ABF23FBA1','02323ABF23FBA2');
client.query(`Insert into WALLET_INFO(user_id, wallet_address, wallet_private_key) VALUES (4,'ABC1','ABC2');`, (err,res)=>{
  if(!err) {
    console.log(res.rows);
  }else{
    console.log(err.message);
  }
  client.end;
})
*/