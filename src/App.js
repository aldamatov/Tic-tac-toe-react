import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [cells, setCells] = useState([...Array(9).keys()]);
  const [flag, setFlag] = useState(false);
  const [dataForX, setDataForX] = useState([]);
  const [dataForO, setDataForO] = useState([]);
  const [winner, setWinner] = useState("");

  const results = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleClick = (i) => {
    let newData = [...cells];
    if (!flag) {
      newData[i] = "X";

      setDataForX([...dataForX, i]);
    } else {
      newData[i] = "O";
      setDataForO([...dataForO, i]);
    }
    setCells(newData);
    setFlag(!flag);
  };
  function longerStreaks(arr1, arr2) {
    let counter = 0;
    for (let i of arr1) {
      if (arr2.includes(i)) {
        counter++;
      }
    }
    return counter === 3 ? true : false;
  }
  useEffect(() => {
    for (let i of results) {
      let joined = i.join("");
      if (dataForX.join("") === joined || longerStreaks(dataForX, i)) {
        console.log("X is a winner");
        setWinner("X won");
      } else if (dataForO.join("") === joined || longerStreaks(dataForO, i)) {
        console.log("O is winner");
        setWinner("0 won");
      }
    }
  }, [dataForX, dataForO]);

  return (
    <div className="App">
      {cells.map((i, ind) => {
        return (
          <div className="box" onClick={() => handleClick(ind)}>
            {i}
          </div>
        );
      })}
      <p>{winner}</p>
    </div>
  );
};

export default App;
