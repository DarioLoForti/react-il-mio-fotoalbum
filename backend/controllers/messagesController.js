const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/RestError.js");
const prisma = new PrismaClient();
require("dotenv").config();

const store = async (req, res) => {
  const { name, email, message } = req.body;

  const data = {
    name,
    email,
    message,
  };

  try {
    const message = await prisma.message.create({
      data,
    });

    res.status(200).send(message);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const totalItems = await prisma.message.count();
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
      throw new RestError("La pagina richiesta non esiste.", 400);
    }

    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: parseInt(offset),
      take: parseInt(limit),
    });

    res.json({
      data: messages,
      page: parseInt(page),
      totalPages,
      totalItems,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = await prisma.message.findUnique({
      where: { id },
    });
    if (message) {
      res.json(message);
    } else {
      throw new RestError(`message con id ${id} non trovato.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.message.delete({
      where: { id: parseInt(id) },
    });
    res.json(`message con id ${id} eliminato con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
