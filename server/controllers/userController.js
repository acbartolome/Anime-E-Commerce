const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        cart: true,
        orderHistory: true,
      },
    });
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    console.log(userId);
    const user = await prisma.User.findUnique({
      where: { id: userId },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    // should we add a hash password
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: name,
      email,
      password,
    });
    res.send(updateUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id: userId },
    });
    res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllUsers, getSingleUser, updateUser, deleteUser };
