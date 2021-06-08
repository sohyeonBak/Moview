module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        star: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    Card.associate = (db) => {
        db.Card.belongsTo(db.User);
        db.Card.hasMany(db.Comment);
        db.Card.hasMany(db.Image);
        db.Card.belongsToMany(db.User, { through: 'Like', as : 'Likers' })
        db.Card.belongsToMany(db.User, { through: 'UnLike', as : 'UnLikers' })
    };
    return Card;
}