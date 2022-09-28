import { useState } from "react";

const Persons = ({ persons, filt }) => {
  console.log(persons);
  let filterdNames = persons.filter((person) => person.name.includes(filt));

  if (filt !== "") {
    return (
      <div>
        <h2>Numbers</h2>
        {filterdNames.map((person) => (
          <p key={person.name}>
            {" "}
            {person.name} {person.number}{" "}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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

  // if (filter.length !== 0) {
  //   setFilNames(persons.filter((person) => person.name.includes(filter)));
  // }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handlefilter={handlefilter} />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        hadleNumChange={hadleNumChange}
      />
      <Persons persons={persons} filt={filter} />
    </div>
  );
};

export default App;
