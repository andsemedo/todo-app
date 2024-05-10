const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },

    email: {
      type: String,
      required: [true, "Please enter user email"],
    },

    phone: {
      type: Number,
      required: false,
    },

    password: {
      type: String,
      required: [true, "Please enter user password"],
      minlength: 6,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.toJSON = async function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.tokens;
//   return user;
// };
UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error();
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) throw new Error();
    return user;
  } catch (error) {
    return "Unable to login: " + error;
  }
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
