import faunaDb from 'faunadb';

const client = new faunaDb.Client({
  queryTimeout: 2000,
  secret: process.env.REACT_APP_DB_KEY,
});
console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_DB_KEY);
console.log(process.env.REACT_APP_ENV);
const faunaQuery = faunaDb.query;
export { client, faunaQuery };