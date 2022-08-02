
import Order from "../models/Order";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      });
      let response = [];
      for (let orders of orderss) {
        let livros = await orders.getLivros(); 
        orders = orders.toJSON(); 
        orders.livros = livros; 
        response.push(orders);
      }
      
      if (!orders.length) {
        return res.status(200).send({
          type: 'warning',
          message: 'Ops! Não foi encontrado os registros!',
          data: []
        });
      }
      
      return res.status(200).send(response);
    }  

    const orders = await Order.findOne({
      where: {
        id
      }
    })
    
    if (!orders) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! Não foi encontrado os registros!',
        data: []
      });
    }

    return res.status(200).send(orders);

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
  let { type } = data;

  if (!type) {
    return res.status(200).send({
      type: 'warning',
      message: 'Ops! você não forneceu os dados necessários!',
      data: []
    });
  }

  let orders = await Order.create({
    type
  })

  return res.status(201).send(orders)

}

const update = async (id, data, res) => {
  let orders = await Order.findOne({
    where: {
      id
    }
  });

  if (!orders) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrado um Registro com o id ${id}` })
  }

  Object.keys(data).forEach(field => orders[field] = data[field]);

  await orders.save();
  return res.status(200).send({
    message: `Registro ${id} atualizado com sucesso`,
    data: orders
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

    let orders = await Order.findOne({
      where: {
        id
      }
    })

    if (!orders) {
      return res.status(200).send({
        type: 'warning',
        message: 'Ops! não foi encontrado nada com esse id !',
        data: []
      });
    }

    await orders.destroy();
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
  destroy
}