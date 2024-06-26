const bodyData = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Name deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name deve essere di almeno 4 caratteri",
      options: { min: 4 },
    },
  },

  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email è un campo obbligatorio.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email deve essere una mail valida",
    },
  },

  message: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Message è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Message deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Message deve essere di almeno 10 caratteri",
      options: { min: 10 },
    },
  },
};

module.exports = {
  bodyData,
};
