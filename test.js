const { MongoClient } = require('mongodb');
const uri = 'mongodb://product_admin:Admin123@cluster0.6wmzla6.mongodb.net:27017/product_db';
async function test() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('CONNECTED');
    await client.close();
  } catch (err) {
    console.log('ERROR:', err.message);
  }
}
test();
