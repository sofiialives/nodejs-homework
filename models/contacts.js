const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const byId = data.find((item) => item.id === contactId);
  return byId || null;
}

async function addContact(data) {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
}

async function updateContact(id, data) {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  list[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};