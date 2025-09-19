// NOTE: Function for creating a new contact message
export const createContact = (req, res) => {
  res.json({
    message: 'create contact'
  })
}

// NOTE: Function to view all contact messages
export const getAllContacts = (req, res) => {
  res.json({
    message: 'get all contacts'
  })
}

// NOTE: Function to display a single contact message with specified id
export const getOneContact = (req, res) => {
  res.json({
    message: 'get one contact'
  })
}

// NOTE: Function for creating a reply to a single message with a specific id
export const answerContact = (req, res) => {
  res.json({
    message: 'answer contact'
  })
}

// NOTE: Function for soft deletion of a contact message with a specific ID
export const deleteContact = (req, res) => {
  res.json({
    message: 'delete contact'
  })
}
