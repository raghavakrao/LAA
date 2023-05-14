'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(100)
      },
      lastName: {
        type: Sequelize.STRING(100)
      },
      mobile: {
        type: Sequelize.STRING(10)
      },
      token: {
        type: Sequelize.TEXT
      },
      custId: {
        type: Sequelize.STRING
      },
      encryptedRequest: {
        type: Sequelize.STRING
      },
      requestDate: {
        type: Sequelize.STRING
      },
      encryptedFiuId: {
        type: Sequelize.STRING
      },
      consentHandleId: {
        type: Sequelize.STRING
      },
      consentId: {
        type: Sequelize.STRING
      },
      sessionId: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};