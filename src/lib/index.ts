import sequelize from "../config";
const init_BDD =async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been estabilished successfully')

        await sequelize.sync().then(result => {
            console.log(result);
            console.log('All models have been added')
        })
        .catch(err => {
            console.log(err);
        });
        
    }catch(error) {
        console.log('Unable to connect to database:', error)
    }
};



export default init_BDD