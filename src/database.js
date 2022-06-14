const {Client} = require('pg')
let client;

// client = new Client ({
//   host: "ec2-34-225-159-178.compute-1.amazonaws.com",
//   user: "tbrfluygrahlkn",
//   port: 5432,
//   password: "af783558cfc0452c0cb9e6591a58fe8dc7b710363e6b379f76c51e9a2f953e75",
//   database: "da6ab7an1qineq",
//   ssl: true
// })

client = new Client ({
  host: "localhost",
  user: "bauti",
  port: 5432,
  password: "pass",
  database: "usersdb",
  ssl: true
})

client.connect();

exports.client = client;

// client.query(`Drop table suscriptions`, (err,res)=>{
//   if(!err) {
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
//   client.end;
// })

client.query(`Create table if not exists wallets(user_id text NOT NULL, wallet_address text NOT NULL, wallet_private_key text NOT NULL)`, (err,res)=>{
  if(!err) {
    console.log(res.rows);
  }else{
    console.log(err.message);
  }
  client.end;
})

// client.query(`Create table if not exists suscriptions(suscription_uid serial NOT NULL, user_id text NOT NULL, suscription_id text NOT NULL, is_paid boolean NOT NULL, expiration timestamp NOT NULL)`, (err,res)=>{
//   if(!err) {
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
//   client.end;
// })

// client.query(`Create table if not exists suscription_types(suscription_uid serial NOT NULL, suscription_name text NOT NULL, price numeric NOT NULL, is_active boolean NOT NULL)`, (err,res)=>{
//   if(!err) {
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
//   client.end;
// })

// // INSERT INTO WALLETS(user_id, wallet_address, wallet_private_key) VALUES (554,'02323ABF23FBA1','02323ABF23FBA2');
// client.query(`Insert into wallets(user_id, wallet_address, wallet_private_key) VALUES (4,'0xABC1','0xABC2');`, (err,res)=>{
//   if(!err) {
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
//   client.end;
// })

// client.query(`Insert into suscription_types(suscription_name, price, is_active) VALUES ('premium',0.00001,true);`, (err,res)=>{
//   if(!err) {
//     console.log(res.rows);
//   }else{
//     console.log(err.message);
//   }
//   client.end;
// })