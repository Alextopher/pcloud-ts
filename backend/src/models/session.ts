// /models/session.ts
import * as Sequelize from "sequelize";
import { sequelize } from "./index";

import { UserInstance } from "./user";

interface SessionAttributes {
  key: string;
  expires: Date;
}

interface SessionCreationAttributes extends SessionAttributes {
  username: string;
}

interface SessionInstance
  extends Sequelize.Model<SessionAttributes, SessionCreationAttributes>,
    SessionAttributes {
  user: UserInstance;
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, string>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserInstance>;

  createdAt?: Date;
  updatedAt?: Date;
}

const Session = sequelize.define<SessionInstance>("Session", {
  key: {
    primaryKey: true,
    type: Sequelize.DataTypes.STRING(32),
  },
  expires: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
  },
});

export default Session;
