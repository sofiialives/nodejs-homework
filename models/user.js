const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter",
    // },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(6)
    .message({ "any.required": "missing required password field" }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(6)
    .message({ "any.required": "missing required password field" }),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = { User, schemas };
