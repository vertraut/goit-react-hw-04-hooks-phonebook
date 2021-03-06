import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../../hooks/useLocalStorage';
import Section from '../Section';
import Form from '../Form';
import ContactsList from '../ContactsList';

import s from './Phonebook.module.css';

function Phonebook() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const addContact = (name, phone) => {
    const nameNormalized = name.toLowerCase();

    const dublicateContactByName = contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized,
    );
    if (dublicateContactByName) {
      alert(`${dublicateContactByName.name} is already in contacts.`);
      return;
    }

    setContacts(prevState => [
      ...prevState,
      {
        name: name,
        phone: phone,
        id: uuidv4(),
      },
    ]);
  };

  return (
    <div className={s.Phonebook}>
      <Section title={'Phonebook'}>
        <Form addContact={addContact} />
        <Section title={'Contacts'}>
          <ContactsList contacts={contacts} stateContactsUpdate={setContacts} />
        </Section>
      </Section>
    </div>
  );
}

export default Phonebook;
