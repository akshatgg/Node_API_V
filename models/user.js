'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({GSTIN}) {
            // define association here
            this.hasMany(GSTIN, {
                foreignKey: 'userId'
            })
        }
    }

    User.init({
        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUID4,
        //     allowNull: false,
        //     unique: true,
        //     primaryKey: true,
        // },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "please enter valid email address"
                },
                notNull: {
                    msg: "please enter email address"
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     isAlphanumeric: true,
            //     notNull: {
            //         msg: "please enter username"
            //     }
            // }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // profileImage: {
        //     type: DataTypes.STRING(1234),
        //     allowNull: true,
        //     defaultValue: "https://i.imgur.com/U1dxgda.png"
        // },
        // notificationToken: {
        //     type: DataTypes.TEXT,
        //     allowNull: true
        // },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // userType: {
        //     type: DataTypes.ENUM('Normal'),
        //     defaultValue: 'Normal',
        //     allowNull: false
        // },
        social_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        // loginVia: {
        //     type: DataTypes.ENUM('Email', 'Google', 'Facebook'),
        //     defaultValue: 'Email',
        //     allowNull: false
        // },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: false
    });
    return User;
};