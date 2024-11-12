import { DataTypes, Model, Sequelize } from 'sequelize'
import { CategoryStatus } from '../../model/model'

export class CategoryPersistence extends Model {
  declare id: string
  declare name: string // Add other fields as needed
  declare status: CategoryStatus
}

export const modelName = 'Category'

export function init(sequelize: Sequelize) {
  CategoryPersistence.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      parent_id: {
        type: DataTypes.STRING,
        field: 'parent_id',
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
        allowNull: false,
        defaultValue: 'active'
      }
      // Add more attributes here if necessary
    },
    {
      sequelize,
      modelName: modelName,
      tableName: 'categories', // specify your table name
      timestamps: true, // Set to true if you need createdAt and updatedAt fields
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
}
