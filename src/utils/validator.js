const isValidEmail = function (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

module.exports = {
  isValidEmail,
};
