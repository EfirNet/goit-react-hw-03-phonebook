import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import ContactsDemo from './contactDemo.json';
import { Wrapper, Title, SubTitle } from './App.styled';

class App extends Component {
  state = {
    contacts: ContactsDemo,
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phonebook'));
    // contacts && contacts.length
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.find(
        item => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
    } else {
      //принимаем props с дочернего компонента
      this.setState(({ contacts }) => {
        const newContact = {
          name,
          number,
          id: nanoid(),
        };
        return {
          contacts: [...contacts, newContact],
        };
      });
    }
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(item => item.id !== id),
      };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    //проверка на пустую строку
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });
    return filteredContacts;
  }

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  render() {
    const { handleFilter, removeContact, addContact } = this;
    const contacts = this.getFilteredContacts();
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <SubTitle>Contacts</SubTitle>
        <Filter handleFilter={handleFilter} />
        <ContactList contacts={contacts} removeContact={removeContact} />
      </Wrapper>
    );
  }
}
export default App;
