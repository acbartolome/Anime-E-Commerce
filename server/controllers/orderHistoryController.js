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
      include: {
        history: true,
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
    const userId = parseInt(req.params.id);
    const orderId = parseInt(req.params.orderId);

    console.log({ userId, orderId });

    const orderHistory = await prisma.orderHistory.findUnique({
      where: {
        userId,
      },
    });
    console.log(orderHistory);

    const oneOrder = orderHistory.history.find(elm => elm.orderId === orderId);

    console.log(oneOrder.order);
    res.send(oneOrder.order);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { viewOrderHistory, getOrder };
