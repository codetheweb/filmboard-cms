/* eslint-disable new-cap */
module.exports = (sequelize, type) => {
  return sequelize.define('Showtime', {
    time: type.DATE
  });
};
