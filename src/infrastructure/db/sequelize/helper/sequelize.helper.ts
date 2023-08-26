import { Sequelize } from 'sequelize-typescript';
import { ModelCtor } from 'sequelize-typescript/dist/model/model/model';

export default class SequelizeHelper {
  private static sequelize: Sequelize;

  static async createConnection(models: ModelCtor[]) {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    this.sequelize.addModels(models);
    await this.sequelize.sync();
  }

  static async closeConnection() {
    await this.sequelize.close();
  }
}
