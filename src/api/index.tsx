import { client, faunaQuery as q} from "../config/db";

//取得Indexes中的所有数据
export const getAllFromMyFirstTable = async () => {
  console.log('RRRRRRRRRRR',await getALLDataFromTableByIndex('all_fields'));
  console.log('RRRRRRRRRRR1',await getALLDataFromTableByIndex('all_fields'));
  console.log('RRRRRRRRRRR2',await getALLDataFromTableByIndex('all_fields'));
};
export async function getALLDataFromTableByIndex(
  indexName: string
){
  const result = await client
  .query(q.Paginate(q.Match(q.Ref('indexes/'+indexName))))
  .then(response => {
    const expenseRef = Object.values(response)[0];
    const refs:any[] = [];
    expenseRef.forEach(function(elem:any, index:any) {
      refs.push(elem);
    });
    const getAllDataQuery = refs.map((ref) => {
      return q.Get(ref);
    });
    return client.query(getAllDataQuery)
    .then(data => Object.values(data).map(each=>each.data));
  })
  .catch(error => console.error('Error: ', error.message));
  console.log('getALLDataFromTableByIndex',result);
  return result;
};

//向MyFirstTable表中插入一条数据
export async function createExpenseItem(mapData:Map<string,any>){
  // getAllFromMyFirstTable();
  console.log('mapData',mapData);
  const result = await client
  .query(
    q.Create(q.Collection('MyFirstTable'), {
      data: mapData
    })
  )
  .then(ret => {
    return {
      createdId:Object.values(ret)[0].id,
      data:Object.values(ret)[2]
    };
  })
  .catch(error => console.error('Error: ', error));
  console.log('createExpenseItem',result);
  return result;
};
  
//Fauna数据库中数据是这样存储的，结构如下。例如下面这个。
// {
//   "ref": Ref(Collection("MyFirstTable"), "305423127509205570"),
//   "ts": 1627533042400000,
//   "data": {
//     "id": 3,
//     "name": "555"
//   }
// }
//其中"305423127509205570"相当与这个表的主键
//下面是根据主键从'MyFirstTable'表中删除数据的处理
export const deleteExpenseItem = (expenseId:string) =>{
  console.log('delete');
  const result = client
  .query(q.Delete(q.Ref(q.Collection('MyFirstTable'), expenseId)));
  const data = result.then(ret=>ret);
  console.log(data);
  // .then(ret => {
  //   console.log('ret',ret);
  //   return ret
  // })
  // .catch(error => console.error('Error: ', error.message));
}
  