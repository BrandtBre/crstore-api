import { response } from "express";
import Adress from "../models/Adress";
import usersController from "./usersController";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Adress.findAll({
        order: [['id', 'ASC']]
      });

      if (!response.length) {
        return res.status(200).send({
          type: 'warning',
          message: 'Ops! Não foi encontrado os registros!',
          data: []
        });
      }
      
      return res.status(200).send({
        type: 'success',
        message: 'Deu boa',
        data: response
      });
    }  

    const response = await Adress.findOne({
      where: {
        id
      }
    })
    
    if (!response) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! Não foi encontrado os registros!',
        data: []
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Deu boa',
      data: response
    });

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const getByUserId = async (req, res) => {
  try {
    let user = await usersController.getUserByToken(req.headers.authorization)

    const response = await Adress.findAll({
      where: { userId: user.id }
    });

    return res.status(200).send({
      type: 'success',
      message: 'Deu boa',
      data: response
    });

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const persist = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const create = async (data, res) => {
  let { street, district, number, city, complement, userId } = data;

  if (!street || !district || !number || !city || !complement || !userId) {
    return res.status(200).send({
      type: 'warning',
      message: 'Ops! você não forneceu os dados necessários!',
      data: []
    });
  }

  let response = await Adress.create({
    street, 
    district, 
    number,
    city,
    complement,
    userId
  })
  return res.status(201).send({
      type: 'warning',
      message: 'Deu bom!!',
      data: response
  });

}

const update = async (id, data, res) => {
  let adress = await Adress.findOne({
    where: {
      id
    }
  });

  if (!adress) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrado um endereço com o id ${id}` })
  }

  Object.keys(data).forEach(field => adress[field] = data[field]);

  await adress.save();
  return res.status(200).send({
    type: 'success',
    message: `Endereço ${id} atualizado com sucesso`,
    data: adress
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    
    if (!id) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! retorne um id valido !',
        data: []
      });
    }

    let adress = await Adress.findOne({
      where: {
        id
      }
    })

    if (!adress) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! não foi encontrado nada com esse id !',
        data: []
      });
    }

    await adress.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Endereço ${id} deletado com sucesso`,
      data: adress
    });

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

export default {
  get,
  persist,
  destroy,
  getByUserId
}