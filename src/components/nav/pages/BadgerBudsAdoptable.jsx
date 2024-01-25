import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "../../BadgerBudSummary"

const adopted = (id) => {
    return JSON.parse(sessionStorage.getItem("adoptedCats")).some(el => el === id);
}

const saved = (id) => {
    return JSON.parse(sessionStorage.getItem("savedCats")).some(el => el === id);
}

export default function BadgerBudsAdoptable() {
    const buds = useContext(BadgerBudsDataContext);
    const [adoptees, setAdoptees] = useState(buds.filter(bud => !saved(bud.id) && !adopted(bud.id)));

    const remove = () => {
        setAdoptees(buds.filter(bud => !saved(bud.id) && !adopted(bud.id)));
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {(adoptees.length === 0)?<p>No buds are available for adoption!</p>:<></>}
        <Container fluid={true}>
            <Row>
                {adoptees.map(bud => {
                    return <Col key={bud.id} sm={12} md={6} lg={4} xl={3}>
                            <BadgerBudSummary remove={remove} {...bud}/>
                        </Col>
                })}
            </Row>
        </Container>
    </div>
}