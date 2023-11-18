const { HttpError, ctrlWrapper } = require("../helpers");

const contacts = require("../models/contacts");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result).status(200);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result).status(200);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.json(result).status(201);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result).status(200);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
