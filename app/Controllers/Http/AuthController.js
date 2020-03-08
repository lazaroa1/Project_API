'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({request, response,auth }) {
    try {
      const {email, password} = request.all()

      const generateToken = await auth.attempt(email,password)

      return generateToken
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }
}

module.exports = AuthController
