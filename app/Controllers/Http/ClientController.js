'use strict'

const Client = use('App/Models/Client')

class ClientController {
  async index({request, response}) {
    try {
      const {page = 1, limit = 10} = request.headers()

      return await Client.query().paginate(page, limit)
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async show({params: {id},response, auth}) {
    try {
      const client = await Client.query().where({id}).where('user_id', '=', auth.user.id).first()

      if(!client) {
        return response.status(404).send({message: 'Nenhum client encontrado'})
      }

      return client
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async store({request, response, auth}) {
    try {
      const {id} = auth.user

      const data  = await request.all()

      const client = await Client.create({...data, user_id: id})

      return client
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async update({params: {id}, request, response}) {
    try {
      const client = await Client.findOrFail({id});

      const data = request.only(["representative_name", 'email', 'password', 'cnpj', 'store_name', 'state', 'address', 'telephone_number_1']);

      client.merge(data);
      await client.save();

      return client;
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }

  async destroy({ params:{id}, response }) {
    try {
      const client = await Client.findOrFail({id});

      await client.delete();
    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.message}`})
    }
  }
}

module.exports = ClientController
