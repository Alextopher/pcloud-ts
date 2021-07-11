// /models/user.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import Session from './session';

interface UserAttributes {
    username: string;
    hash: string;
    isAdmin: boolean;
}

interface UserCreationAttributes 
    extends Optional<UserAttributes, "isAdmin"> {}

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }

const User = sequelize.define<UserInstance>(
    'User',
    {
    username: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    hash: {
        type: DataTypes.STRING,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    }
);

// Users can have multiple sessions
User.hasMany(Session, { foreignKey: { name: "username", allowNull: false }, onDelete: 'CASCADE' });
Session.belongsTo(User, { foreignKey: { name: "username", allowNull: false }, onDelete: 'CASCADE' });

export default User;