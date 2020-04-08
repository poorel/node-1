var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
});

connection.connect();

// 新增的 SQL 语句及新增的字段信息
let updateSql = "UPDATE user SET name = ?,age = ? WHERE Id = ?";
let updateSqlParams = ["LiangJunrong", 23, 1];

connection.query(updateSql, updateSqlParams ,function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();

