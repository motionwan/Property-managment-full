const mongoose = require('mongoose');

const { Schema } = mongoose;
// const { Building } = require('./buildings.mongo');
// const { Room } = require('./rooms.mongo');

const deviceSchema = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String },
    model: { type: String, required: true },
    status: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: function () {
        if (this.gang) {
          const gangsStatus = {};
          for (let i = 1; i <= this.gang; i++) {
            gangsStatus[`gang${i}`] = 'off';
          }
          return gangsStatus;
        }
        return {};
      },
    },
    gang: { type: Number },
    connectionId: { type: String, unique: true },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    additionalAttributes: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

deviceSchema.pre('save', async function (next) {
  if (!this.connectionId) {
    // Generate a random connection ID if it doesn't exist
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const connectionIdLength = 6;
    let connectionId = '';

    for (let i = 0; i < connectionIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      connectionId += characters[randomIndex];
    }

    this.connectionId = connectionId;
  }

  next();
});

const deviceModel = mongoose.model('Device', deviceSchema);

module.exports = deviceModel;
