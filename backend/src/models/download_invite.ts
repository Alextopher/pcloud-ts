import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface DownloadInviteAttributes {
  key: string;
  path: string;
  expires?: Date;
  uses?: number;
}

interface DownloadInviteCreationAttributes extends DownloadInviteAttributes {}

interface DownloadInviteInstance
  extends Model<DownloadInviteAttributes, DownloadInviteCreationAttributes>,
    DownloadInviteAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const DownloadInvite = sequelize.define<DownloadInviteInstance>(
  "DownloadInvite",
  {
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
  }
);

export default DownloadInvite;
