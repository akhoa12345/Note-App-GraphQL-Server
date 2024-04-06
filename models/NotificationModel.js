import mongoose from 'mongoose'

const { Schema } = mongoose

const notificationSchema = new Schema({
  content: {
    type: String
  }
}, { timestamps: true })

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel
