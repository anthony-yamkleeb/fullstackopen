import React from "react";

const Sum = ({ parts }) => {
  return (
    <b>
      total of{" "}
      {parts.reduce((sum, course) => {
        return sum + course.exercises;
      }, 0)}{" "}
      exercises
    </b>
  );
};

const Part = ({ course, exercises, id }) => {
  return (
    <p>
      {course} {exercises}
    </p>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((courses) => (
        <Part
          key={courses.id}
          course={courses.name}
          exercises={courses.exercises}
        />
      ))}
      <Sum parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
