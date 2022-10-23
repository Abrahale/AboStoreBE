import moongose from 'mongoose';

export class DbConnection{
  constructor(){this.init()}
  init = async () => {
    await moongose.connect(process.env.MONGO_DB_URI as string, {
          dbName: process.env.DB_NAME
      }, (err) => {
          if (err) {
              console.log("=====There was an Error======= " + err);
          }
          else
              console.log(`========== DB connection to ${process.env.DB_NAME} established ===========`);
      })
  }
}

export const getConnectionInstance = () =>{
  return new DbConnection();  
}


