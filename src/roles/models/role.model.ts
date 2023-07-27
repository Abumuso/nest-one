import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserRoles } from './user-roles.model';
import { User } from '../../users/models/user.model';

interface RoleCreationAttrs {
  value: string;
  desc: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  value: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  desc: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
