import { useParams, Link } from "react-router-dom";
import Cupcake from "@components/Cupcake";
import { useEffect, useState } from "react";

export default function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupcake] = useState({});
  useEffect(async () => {
    const response = await fetch(`http://localhost:4000/cupcakes/${id}`);
    const data = await response.json();
    setCupcake(data);
  }, [id]);

  return (
    <>
      <Cupcake cupcake={cupcake} />
      <Link to="/cupcakes"> Back to list</Link>
    </>
  );
}
