import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSaved from "../../BadgerBudSaved"

const adopted = (id) => {
    return JSON.parse(sessionStorage.getItem("adoptedCats")).some(el => el === id);
}

const saved = (id) => {
    return JSON.parse(sessionStorage.getItem("savedCats")).some(el => el === id);
}

export default function BadgerBudsBasket(props) {
    const buds = useContext(BadgerBudsDataContext);
    const [savedCats, setSaved] = useState(buds.filter(bud => saved(bud.id) && !adopted(bud.id)));

    const remove = () => {
        setSaved(buds.filter(bud => saved(bud.id) && !adopted(bud.id)));
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {(savedCats.length === 0)? <p>You have no buds in your basket!</p>: <></>}
        <Container fluid={true}>
            <Row>
                {savedCats.map(bud => {
                    return <Col key={bud.id} sm={12} md={6} lg={4} xl={3}>
                            <BadgerBudSaved remove={remove} {...bud}/>
                        </Col>
                })}
            </Row>
        </Container>
    </div>
}