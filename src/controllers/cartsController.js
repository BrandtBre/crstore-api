import { response } from "express";
import Cart from "../models/Cart";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Cart.findAll({
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
        message: 'Deu boa!',
        data: response
      });
    }  

    const response = await Cart.findOne({
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

    res.status(200).send({
      type: 'success',
      message: 'Deu boa!',
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
    
    let user = await usersController.getUserByToken(req.headers.authorization);

    const response = await Adress.findAll({
      where: { userId: user.id }
    });
    
    if (!response.length) {
      return res.status(200).send({
        type: 'error',
        message: 'Você ainda não tem nenhum carrinho!',
        data: error.message
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

const persist = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!id) {
      return await create(req.body, res, user);
    }

    return await update(id, req.body, res, user);

  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const create = async (data, res, user) => {
  let { items, customerId } = data;

  if (!items || !customerId ) {
    return res.status(200).send({
      type: 'warning',
      message: 'Ops! você não forneceu os dados necessários!',
      data: []
    });
  }

  let response = await Cart.create({
    items,
    customerId: user.id
  })

  return res.status(201).send(response)

}

const addToCart = async (data, res, item) => {
  try {
    let { items, customerId } = data;
    let carrinho = Cart;
    let i = findIndex(itemCart => item === itemCart.id)

    if (i == -1) {
      carrinho.push({id: item, quantidade });
    } else {
        carrinho[i].quantidade += quantidade;
    }



  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }

}

const update = async (id, data, res) => {
  let response = await Cart.findOne({
    where: {
      id
    }
  });

  if (!response) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrado um Registro com o id ${id}` })
  }

  Object.keys(data).forEach(field => response[field] = data[field]);

  await response.save();
  return res.status(200).send({
    message: `Registro ${id} atualizado com sucesso`,
    data: response
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

    let response = await Cart.findOne({
      where: {
        id
      }
    })

    if (!response) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! não foi encontrado nada com esse id !',
        data: []
      });
    }

    await response.destroy();
    return res.status(200).send({
      message: `Registro id ${id} deletado com sucesso`
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