"use strict";

var  db = require('../config/db');

module.exports = {
  addUser: function (id,email,name) {
    console.log(id,email,name);
    // console.log('add data--',data);
    let query =  `INSERT INTO user (id, email, name) VALUES (:status)`;
      return db.query(query, {replacements: {status: [id,email,name]}, type: db.QueryTypes.INSERT})
     .then(data => {
       console.log('insert',data);
       return {message: 'success'};
     })
      .catch(error => error);
   },
   fetchSetId: function (data) {
     let query =  `SELECT story_id from user where id = :data`;
     return db.query(query, {replacements: {data: data}, type: db.QueryTypes.SELECT})
     .then(data => {
       return data;
     })
      .catch(error => error);   
  },
  updateSetId: function (data) {
     let query =  `UPDATE user set story_id = story_id+1 where id = :data`;
     return db.query(query, {replacements: {data: data}, type: db.QueryTypes.UPDATE})
     .then(data => {
      //  console.log('update data',data);
       return {message: 'update-success'};
     })
      .catch(error => {
      console.log('error',error);
      return error;
    });     
  },
  fetchScore: function () {
     let query =  `SELECT name,score from user order by score ASC`;
     return db.query(query, { type: db.QueryTypes.SELECT})
     .then(data => {
      //  console.log('update data',data);
       return data;
     })
      .catch(error => {
      console.log('error',error);
      return error;
    });     
  },  
  checkUser: function (id) {
    var obj;
    let query = `SELECT id,name from user where id = :id`;
    return db.query(query, {replacements: {id: id}, type: db.QueryTypes.SELECT})
      .then(data => {
        if(data.length) {
          obj = {exist: true,id: data[0].id,name: data[0].name}
        } else {
          obj = {exist: false}
        }
        return obj;
      })
     .catch(error => error);
  }
};

