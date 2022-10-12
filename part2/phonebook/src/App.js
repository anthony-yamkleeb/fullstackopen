import { useState } from "react";
import { useEffect } from "react";
import contactService from "./persons";
import "./index.css";

const Persons = ({ persons, filt, handleDelete }) => {
  console.log(persons);
  let filterdNames = persons.filter((person) => person.name.includes(filt));

  if (filt !== "") {
    return (
      <div>
        <h2>Numbers</h2>
        {filterdNames.map((person) => (
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  );
};

const Form = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  hadleNumChange,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={hadleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Filter = ({ filter, handlefilter }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handlefilter} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const AddedPerson = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="added">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [addedPerson, setAddedPerson] = useState(null);

  useEffect(() => {
    contactService.getAll().then((initailPersons) => {
      setPersons(initailPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      const person = persons.find((person) => person.name === newName);
      const id = person.id;
      const newPerson = { ...person, number: newNumber };

      contactService.update(id, newPerson).then((newNum) => {
        setPersons(persons.map((per) => (per.id !== id ? per : newNum)));
      });

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    contactService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setAddedPerson(`added ${newPerson.name}`);
      setTimeout(() => {
        setAddedPerson(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const hadleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlefilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((per) => per.id === id);
    window.confirm(`Delete ${person.name}?`);
    contactService.deletePerson(person).catch((error) => {
      setErrorMessage(
        `Information of ${person.name} has already been removed form server`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setPersons(persons.filter((per) => per.id !== id));
    });
    setPersons(persons.filter((per) => per.id !== id));
  };

  // if (filter.length !== 0) {
  //   setFilNames(persons.filter((person) => person.name.includes(filter)));
  // }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <AddedPerson message={addedPerson} />
      <Filter filter={filter} handlefilter={handlefilter} />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        hadleNumChange={hadleNumChange}
      />
      <Persons persons={persons} filt={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
