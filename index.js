const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        console.warn("\x1B[31m Contact not found!");
        break;
      }
      console.log(contact);
      console.warn("\x1B[31m Contact founded!");
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      console.warn("\x1B[31m Contact added!");
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.warn("\x1B[31m Contact not found!");
        break;
      }
      console.log(removedContact);
      console.warn("\x1B[31m Contact removed!");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
