import { useState } from "react";

const Button = ({ text, click }) => <button onClick={click}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, avg, percPos }) => {
  if (total === 0) {
    return (
      <div>
        <h2>Stattistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <table>
      <h2>Stattistics</h2>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={total} />
      <StatisticLine text={"average"} value={avg} />
      <StatisticLine text={"pos"} value={percPos} />
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);
  let total = good + neutral + bad;
  let avg = (good - bad) / total;
  let percPos = (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={increaseGood} text={"good"} />
      <Button click={increaseNeutral} text={"neutral"} />
      <Button click={increaseBad} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        percPos={percPos}
      />
    </div>
  );
};

export default App;
