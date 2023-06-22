class UserManagerMongo{
    constructor(model){
        this.model=model;
    };

    async addUser(user){
        try {
            const data = await this.model.create(user);
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al guardar: ${error.message}`);
        }
    };

    async getUserByEmail(email){
        try {
            const data = await this.model.findOne({email:email});
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    };
    
    async getUserById(userId){
        try {
            const user = await this.model.findById(userId);
            if(!user){
                throw new Error("El usuario no existe");
            }
            return JSON.parse(JSON.stringify(user));
        } catch (error) {
            throw error;
        }
    };

    async saveUser(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };
}

export {UserManagerMongo};