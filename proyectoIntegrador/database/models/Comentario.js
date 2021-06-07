module.exports= (sequelize, dataTypes)=>{

    let alias = "Comentario";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        created_at:{
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        updated_at:{
            type: dataTypes.DATEONLY,
            allowNull: true
        },
        texto:{
            type: dataTypes.STRING,
        },
        usuario_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        productos_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
    
    };
    let config={
        table: "productos",
        timestamps: true,
        underscored: true,
    };

    const Comentario = sequelize.define(alias, cols,config)
    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Usuario, {
            as: "comentarios",
            foreignKey: "usuarios_id"
        

        });
    }
        Comentario.belongsTo(models.Producto, {
            as: "comentarios",
            foreignKey: "productos_id"
    

    });

    return Comentario
}


