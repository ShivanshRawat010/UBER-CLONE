const userModel = require('../models/user.model')

module.exports.createUser = async function({firstName, lastName, email, password}){
  if(!firstName || !email || !password){
    throw new Error('All fields are required')
  }

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password
  })

  return user;
}