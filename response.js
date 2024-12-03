// file ini untuk tampung semua response dari project, agar output dari API lebih rapih dan sama semua

const response = (statusCode, data, message, res) => {
  res.json(statusCode, [
    {
      payload: data,
      message,
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
  ]);
};

module.exports = response;
