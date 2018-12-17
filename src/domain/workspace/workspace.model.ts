import * as mongoose from 'mongoose';
import toJson from '../../app-services/mapping/toJson';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  }
});

workspaceSchema.set('toObject', { virtuals: true });

workspaceSchema.method('toGraph', toJson);

export default mongoose.model('Workspace', workspaceSchema);
