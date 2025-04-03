const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

// Przed zapisem kopiujemy _id do id
userSchema.pre("save", function (next) {
    this.id = this._id.toString(); 
    next();
});

// Generowanie tokena z id zamiast _id
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, email: this.email, status: this.status, firstName: this.firstName, lastName: this.lastName }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const minPasswordLength = 8; // Minimalna długość hasła
    const maxPasswordLength = 30; // Maksymalna długość hasła
    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            "string.empty": "Imię nie może być puste",
            "any.required": "Imię jest wymagane"
        }),
        lastName: Joi.string().required().messages({
            "string.empty": "Nazwisko nie może być puste",
            "any.required": "Nazwisko jest wymagane"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Podaj poprawny adres email",
            "string.empty": "Email nie może być pusty",
            "any.required": "Email jest wymagany"
        }),
        password: passwordComplexity(
            {
                min: minPasswordLength,
                max: maxPasswordLength,
                lowerCase: 1,
                upperCase: 1,
                numeric: 1,
                symbol: 0,
                requirementCount: 3
            },
            "Hasło"
        ).messages({
            "passwordComplexity.tooShort": `Hasło musi mieć co najmniej ${minPasswordLength} znaków`,
            "passwordComplexity.tooLong": `Hasło może mieć maksymalnie ${maxPasswordLength} znaków`,
            "passwordComplexity.lowercase": "Hasło musi zawierać co najmniej jedną małą literę",
            "passwordComplexity.uppercase": "Hasło musi zawierać co najmniej jedną wielką literę",
            "passwordComplexity.numeric": "Hasło musi zawierać co najmniej jedną cyfrę",
            "any.required": "Hasło jest wymagane"
        }),
        status: Joi.string().valid("ADMIN", "USER").messages({
            "any.only": "Status musi być 'ADMIN' lub 'USER'"
        })
    });
    return schema.validate(data);
};


module.exports = { User, validate };
