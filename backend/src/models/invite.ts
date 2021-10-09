import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface InviteAttributes {
  key: string;
  path: string;
  expires?: Date;
  uses?: number;
}

interface InviteCreationAttributes extends InviteAttributes {}

interface InviteInstance
  extends Model<InviteAttributes, InviteCreationAttributes>,
    InviteAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Invite = sequelize.define<InviteInstance>("Invite", {
  key: {
    primaryKey: true,
    type: DataTypes.STRING(32),
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
  },
  uses: {
    type: DataTypes.TINYINT,
  },
});

export default Invite;
