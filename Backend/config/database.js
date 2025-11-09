import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('climatequest', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
