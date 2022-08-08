
import Order from "../models/Order";
import Item from "../models/Item";
import OrderItem from "../models/OrderItem";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      });
      
      if (!orders.length) {
        return res.status(200).send({
          type: 'warning',
          message: 'Ops! Não foi encontrado os registros!',
          data: []
        });
      }
      
      let response = [];
      for (let order of orders) {
        let items = await order.getItems(); 
        order = order.toJSON(); 
        order.items = items; 
        response.push(order);
      }
      
      
      return res.status(200).send({
        type: 'success',
        message: 'Deu bom !',
        data: response
      });
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

    let response = orders.toJSON();
    response.items = await orders.getItems({
      attributes: ['id', 'name', 'price', 'categoryId'],
    });

    res.status(200).send({
      type: 'success',
      message: 'Deu bom',
      data: orders
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
  let { status, customerId, employeeId, paymentMethodId, couponId, items } = data;

  if (!status || !customerId || !employeeId || !paymentMethodId || !couponId ) {
    return res.status(200).send({
      type: 'warning',
      message: 'Ops! você não forneceu os dados necessários!',
      data: []
    });
  }
  let order = await Order.create({
    status,
    customerId,
    employeeId,
    paymentMethodId,
    couponId
  })
  for (let item of items) {
    let itemExistente = await Item.findOne({
      where: {
        id: item.itemId
      }
    })
    
    if (!itemExistente) {
      await order.destroy();
      return res.status(400).send({
        message: `O item id ${item} não existe. O pedido não foi salvo!!`
      })
    }

    await OrderItem.create({
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      orderId: order.id,
      itemId: itemExistente.id
    });
  }
  
  return res.status(201).send(order)
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