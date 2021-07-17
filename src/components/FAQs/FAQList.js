import React, {useState, useEffect} from 'react'
import {getFAQs} from "../../hooks/useFirebase";
import FAQCard from './FAQCard';
import { ListGroup } from "react-bootstrap";



export default function FAQList() {
    const [FAQs, setFAQs] = useState([]);

    useEffect(() => getFAQs(setFAQs), [])

    return (
        <ListGroup>
        {FAQs.map((FAQ, index) => (
            <FAQCard currentFAQ={FAQ} key={index} />
        ))}
        </ListGroup>
    )
}
