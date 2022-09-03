const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.course} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <div>
      <Part course={parts[0].name} exercises={parts[0].exercises} />
      <Part course={parts[1].name} exercises={parts[1].exercises} />
      <Part course={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};
const Total = (props) => {
  const parts = props.parts;
  return <p>{parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Half Stack application development",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
