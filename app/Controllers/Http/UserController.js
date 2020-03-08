'use strict'

const User = use('App/Models/User')

class UserController {
  async index({request, response}) {
    try {
      const {page = 1, limit = 10} = request.headers()

      return await User.query().paginate(page, limit)
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async show({params: {id},response}) {
    try {
      const user = await User.query().where({id}).first()

      if(!user) {
        return response.status(404).send({message: 'Nenhum usuario encontrado'})
      }

      return user
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async store({request, response}) {
    try {
      const data  = await request.all()

      const user = await User.create(data)

      return user
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async update({params, request, response}) {
    try {
      const user = await User.findOrFail(params.id);

      const data = request.only(["name", 'email', 'password', 'cpf', 'company_name', 'telephone_number_1']);

      user.merge(data);

      await user.save();

      return user;
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async destroy({ params:{id}, response }) {
    try {
      const user = await User.findOrFail({id});

      await user.delete();
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }
}

module.exports = UserController
