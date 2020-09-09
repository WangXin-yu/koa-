var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017';
var dbName = 'koa';

// 连接数据库
// console.time('start');
// MongoClient.connect(dbUrl, {useUnifiedTopology:true}, (err, client) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     var db = client.db(dbName);

//     // 增加数据
//     db.collection('user').insertOne({'username': '王五', 'age': 25, 'sex':'男',"status":"1"}, function(err, result) {
//         if (!err) {
//             console.log('增加数据成功')
//             client.close();
//             console.timeEnd('start');
//         }
//     })
// })

console.time('start1');
MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }

    var db = client.db(dbName);

    // 查询数据
    var result = db.collection('user').find({});
    result.toArray((err, docs) => {
        console.timeEnd('start1');
        console.log(docs);
    })
})