const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//view orderHistory based on id
const viewOrderHistory = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const orderHistory = await prisma.orderHistory.findUnique({
      where: {
        userId,
      },
    });
    res.send(orderHistory);
  } catch (error) {
    console.log(error);
  }
};

//get a specific order by ID of the user
const getOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    res.send(order);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { viewOrderHistory, getOrder };
