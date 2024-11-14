import { DataTypes, Model, Sequelize } from 'sequelize'

export class BrandPersistence extends Model {
  // declare id: string
  // declare name: string // Add other fields as needed
  // declare status: CategoryStatus
}

export const modelName = 'Brand'

export function init(sequelize: Sequelize) {
  BrandPersistence.init(
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
      tagLine: {
        type: DataTypes.STRING,
        field: 'tag_line',
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
      tableName: 'brands', // specify your table name
      timestamps: true, // Set to true if you need createdAt and updatedAt fields
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
}
