const { date } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");

const reservationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
});


const Reservation = mongoose.model("Reservation", reservationSchema);

const validate = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required().label("User ID"),
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        date: Joi.date().required().label("Date"),
    });
    return schema.validate(data);
};



module.exports = { Reservation, validate };
