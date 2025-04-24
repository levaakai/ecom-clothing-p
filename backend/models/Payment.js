import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

/**
 * Payment.status:
    This tracks the status of the payment attempt itself.
    If a user tries mobile money and it fails, this might be 'failed'.
    If it succeeds, it's 'paid'.

    Think of this as a record of the transaction.
 */

export default(sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        method: {       //'cash_on_delivery', 'mobile_money'
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {           // 'pending', 'paid', 'failed'
            type: DataTypes.STRING,
            defaultValue: "pending"
        },
        transactionRef: {           // mobile money reference
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
    timestamps: true
    })
    return Payment
}
