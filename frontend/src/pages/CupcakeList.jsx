/* eslint-disable prettier/prettier */
import Cupcake from "@components/Cupcake";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CupcakeList() {
  // Step 1: get all cupcakes
  const [cupcakes, setCupcakes] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(async () => {
    const response = await fetch("http://localhost:4000/cupcakes");
    const data = await response.json();
    const bonusResponse = await fetch("http://localhost:4000/accessories");
    const bonusData = await bonusResponse.json();
    setCupcakes(data);
    setBonuses(bonusData);
  }, []);
  if (cupcakes.length === 0 || bonuses.length === 0) return "Loading...";
  // Step 3: get all accessories
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            onChange={(e) => setFilter(e.target.value)}
            id="cupcake-select"
          >
            <option value="">---</option>
            {bonuses.map((bonus) => {
              return (
                <option key={bonus.id} value={bonus.id}>
                  {bonus.name}
                </option>
              );
            })}
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes
          .filter((cake) => {
            if (filter !== "") {
              return cake.accessory_id === filter;
            }
            return cake;
          })
          .map((cake) => {
            return (
              <li className="cupcake-item">
                <Link to={`/cupcakes/${cake.id}`}>
                  <Cupcake key={cake.id} cupcake={cake} />
                </Link>
              </li>
            );
          })}
        {/* end of block */}
      </ul>
    </>
  );
}
