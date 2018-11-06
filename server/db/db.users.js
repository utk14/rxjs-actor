const {Observable} = require('rxjs-compat');
const userModel = require('../db/models/users');

function addUser(req){ // to add user to users table
  const user = new userModel(req);
  const observable = Observable.create((observer) => {
    user.save((error, doc) => {
      try{
        observer.next(doc)
      }catch(error) {
        observer.error(error)
      }
    })
  })
  return observable;
}

function getUserByName(req){ // to get user details by users table
  const observable = Observable.create((observer) => {
    userModel.find({userName:req.userName},function (err, doc){
      try{
        observer.next(doc)
      }catch(error) {
        observer.error(error)
      }
    })
  })
  return observable;
}

function deleteUser(userid){ // to delete user for a particular user id
  const observable = Observable.create((observer) => {
    userModel.findOneAndDelete({ userId: userid}, function (err, doc) {
      try{
        observer.next(doc)
      }catch(error) {
        observer.error(error)
      }
    })
  })
  return observable;
}

function findAndUpdateUser(old_data,new_data){ // find user by old_data and update user by new_data
  const observable = Observable.create((observer) => {
    userModel.findOneAndUpdate(old_data,new_data,{
      upsert: true,
      new: true
    },(error, doc) => {
        try{
          observer.next(doc)
        }catch(error) {
          observer.error(error)
      }
    })
  })
  return observable;
}

module.exports = { 
  addUser : addUser,
  getUserByName : getUserByName,
  deleteUser : deleteUser,
  findAndUpdateUser : findAndUpdateUser
}