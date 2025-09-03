const userRepository = require('../repositories/user.repository')
const createError = require('http-errors')
require('dotenv').config()
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const nodemailer = require('nodemailer')

async function create(user) {
  const existingUser = await userRepository.findByWhere({ email: user.email });

  if (existingUser) throw createError(409, 'User already exists')

  user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT))
  const createdUser = await userRepository.create(user)

  const userJson = createdUser.toJSON()
  delete userJson.password

  const token = sign(
    { id: createdUser.id },
    process.env.SECRET,
    { expiresIn: '30d' }
  )

  return {
    auth: true,
    user: userJson,
    token,
  }
}

async function login(user) {
  const userLogin = await userRepository.findByWhere({ email: user.email })
  if (!userLogin) throw createError(401, 'User not registered!')

  const passwordMatch = await bcrypt.compare(user.password, userLogin.password)
  if (!passwordMatch) throw createError(401, 'Password does not match!')

  const token = sign(
    { id: userLogin.id },
    process.env.SECRET,
    { expiresIn: '30d' }
  )

  const userJson = userLogin.toJSON()
  delete userJson.password

  return {
    auth: true,
    user: userJson,
    token,
  }
}

async function getUserInfoById(id) {
  const user = await userRepository.findById(id)
  if (!user) throw createError(404, 'User not found')

  const userInfoJson = user.toJSON()
  delete userInfoJson.password

  return userInfoJson
}

async function getUserInfoByEmail(email) {
  const user = await userRepository.findByWhere({ email })
  if (!user) throw createError(404, 'User not found')

  const userInfoJson = user.toJSON()
  delete userInfoJson.password

  return userInfoJson
}

async function update(data, id) {
  const existingUser = await userRepository.findById(id)
  if (!existingUser) throw createError(404, 'User not found')

  if (data.password) {
    throw createError(404, 'It is not possible to change password.')
  }

  const result = await userRepository.update(data, id)
  if (result[0] === 0) {
    throw createError(400, 'Update failed')
  } else {
    const updatedUser = await userRepository.findById(id)
    const updatedUserJson = updatedUser.toJSON()
    delete updatedUserJson.password

    return updatedUserJson
  }
}

async function updatePassword(data, id) {
  const user = await getUserInfoById(id) 

  if (!user) throw createError(404, 'User not found')
  
  data.password = await bcrypt.hash(data.password, parseInt(process.env.SALT))
  const result = await userRepository.update(data, id)
  if (result[0] === 0) {
    throw createError(400, 'Update failed')
  } else {
    const updatedUser = await userRepository.findById(id)
    const updatedUserJson = updatedUser.toJSON()
    delete updatedUserJson.password

    return updatedUserJson
  }
}

async function forgotPassword(email) {
  const user = await getUserInfoByEmail(email)

  const token = sign(
    { id: user.id },
    process.env.TEMPORARY_SECRET,
    { expiresIn: '5m' }
  )

  const resetLink = `${process.env.FRONTEND_URL}/recover-password?token=${token}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: process.env.SPENDO_EMAIL, 
      pass: process.env.SPENDO_PASSWORD 
    }
  })

  await transporter.sendMail({
    from: process.env.SPENDO_EMAIL,
    to: user.email,
    subject: 'Recuperação de Senha do Spendo',
    html: `
      <p>Click the link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `
  })

  return "Link sent successfully"
}


module.exports = {
  create,
  getUserInfoById,
  getUserInfoByEmail,
  login,
  update,
  forgotPassword,
  updatePassword,
}
