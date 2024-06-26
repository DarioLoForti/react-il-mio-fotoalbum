const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Title deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Title deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
    trim: true,
  },

  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Description è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Description deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Description deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
    trim: true,
  },

  visible: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Visible deve essere un booleano.",
    },
    toBoolean: true,
  },

  categories: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Categories è un campo obbligatorio.",
      bail: true,
    },
    isArray: {
      errorMessage: "Categories deve essere un array.",
    },
    custom: {
      options: async (idStrings) => {
        const ids = idStrings.map((id) => parseInt(id));
        if (ids.length === 0) {
          throw new Error(`Una fotografia deve avere almeno una categoria.`);
        }
        const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new Error(`Uno o più ID non sono dei numeri interi.`);
        }
        const categories = await prisma.category.findMany({
          where: { id: { in: ids } },
        });
        if (categories.length !== ids.length) {
          throw new Error(`Uno o più categorie specificati non esistono.`);
        }
        return true;
      },
    },
    customSanitizer: {
      options: (ids) => ids.map((id) => ({ id: parseInt(id) })),
    },
  },
};

module.exports = {
  bodyData,
};
