import { Schema, model, models } from 'mongoose';

//  The "models" object is provided by the mongoose
// library and stores all of the registered models.
// If a model named "User" is already exists in the
// "models" object, it assigns that existing model
// to the "User" variable.
// This prevents redifining models and ensures that
// the existing models is reused

// If a model named "User" doesn't exist in the
// "models" object, it creates a new model using
// The newly created model is assigned to "User" variable

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
  },
});

const User = models.User || model('User', userSchema);

export default User;
