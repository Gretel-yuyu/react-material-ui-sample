import { client, faunaQuery as q} from "../config/db";

// export const getAllFromMyFirstTable =()=>{
//   const data = client.query(q.Paginate(q.Collections()), {
//     queryTimeout: 100,
//   })
//   console.log('data', data);
//   // return data;
// };

//   client
//   .query(q.Paginate(q.Match(q.Ref('indexes/all_fields'))))
//   .then(response => {
//     const expenseRef = response.data;
//     const getAllDataQuery = expenseRef.map((ref) => {
//       return q.Get(ref);
//     });
//     return client.query(getAllDataQuery).then(data => data);
//   })
//   .catch(error => console.error('Error: ', error.message)));
export const createExpenseItem = (name:string):void => {
  console.log(666);
  client
  .query(
    q.Create(q.Collection('MyFirstTable'), {
      data: {
        id:3,
        name:name
      }
    })
  )
  .then(ret => ret)
  .catch(error => console.error('Error: ', error));
};
  
// export const deleteExpenseItem = expenseId =>
//   client
//     .query(q.Delete(q.Ref(q.Collection('expenses'), expenseId)))
//     .then(ret => ret)
//     .catch(error => console.error('Error: ', error.message));