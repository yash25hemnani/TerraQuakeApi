import { Schema, model } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

// Schema contact
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    answer: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'contacts'
  }
)

// Plugin soft-delete
contactsSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

// Creating the contact model based on the contactsSchema schema
const Contact = model('contacts', contactsSchema)

// Exporting the contact model
export default Contact
