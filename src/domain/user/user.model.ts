import * as mongoose from 'mongoose';

import toJson from '../../app-services/mapping/toJson';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  }
});

userSchema.set('toObject', { virtuals: true });

userSchema.method('toGraph', toJson);

export default mongoose.model('User', userSchema);
