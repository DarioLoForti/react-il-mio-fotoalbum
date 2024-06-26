const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const deleteImage = require("../utils/deleteImage");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require("../utils/RestError");
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  const { title, description, categories } = req.body;

  const data = {
    title,
    description,
    visible: req.body.visible ? true : false,
    categories: {
      connect: categories,
    },
  };

  if (req.file) {
    data.image = `${HOST}:${port}/image/${req.file.filename}`;
  }
  console.log(data);
  try {
    const photo = await prisma.photo.create({
      data,
    });

    res.status(200).send(photo);
  } catch (error) {
    if (req.file) {
      deleteImage("image", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const index = async (req, res) => {
  try {
    const where = {};
    const { visible, page = 1, limit = 10 } = req.query;
    if (visible === "true") {
      where.visible = true;
    } else if (visible === "false") {
      where.visible = false;
    }

    const offset = (page - 1) * limit;

    const totalItems = await prisma.photo.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
      throw new RestError("La pagina richiesta non esiste.", 400);
    }

    const photos = await prisma.photo.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: parseInt(offset),
      take: parseInt(limit),
      include: {
        _count: {
          select: {
            categories: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({
      data: photos.map((p) => ({
        ...p,
        totalCategories: p._count.categories,
        _count: undefined,
      })),
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
    const { id } = req.params;
    const photo = await prisma.photo.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (photo) {
      res.json(photo);
    } else {
      throw new RestError(`Fotografia con id ${id} non trovata.`, 404);
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categories } = req.body;
    const data = {
      title,
      description,
      visible: req.body.visible ? true : false,
      categories: {
        set: categories,
      },
    };
    if (req.file) {
      data.image = `${HOST}:${port}/image/${req.file.filename}`;
    }
    const photo = await prisma.photo.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    res.json(photo);
  } catch (err) {
    if (req.file) {
      deleteImage("image", req.file.filename);
    }
    errorHandler(err, req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.photo.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(`Fotografia con id ${id} eliminata con successo.`);
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
