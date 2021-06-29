import React, {useState, useEffect} from "react";
import { ListGroup } from "react-bootstrap";
import InventoryCard from "./InventoryCard";
import { getItems } from "../../hooks/useFirebase";
import LoadingIndicator from "../general/LoadingIndicator";


export default function InventoryList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(setLoading, setItems);
    return () => {};
  }, [])

  return (
    loading ? (
      <LoadingIndicator />
    ) : (
    <ListGroup>
      {items.map((item, index) => (
        <InventoryCard currentItem={item} key={index} />
      ))}
    </ListGroup>
    )
  );
}
