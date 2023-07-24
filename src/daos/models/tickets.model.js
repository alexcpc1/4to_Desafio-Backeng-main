import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    purchase_daytime: {type: Date},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
});

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);