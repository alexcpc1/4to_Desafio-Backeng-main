import { ChatModel } from "../models/chat.model.js";

class ChatMongo{
    constructor(model){
        this.model = ChatModel;
    }

    async addMessage(object){
        try {
            const data = await this.model.create(object);
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Hubo un error al guardar el mensaje`);
        }
    };

    async getMessages(){
        try {
            const data = await this.model.find();
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Hubo un error al guardar el mensaje`);
        }
    };
}
export {ChatMongo};