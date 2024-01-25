import {useState} from "react";
import {Carousel} from "react-bootstrap";

function calcAge(age) {
    let years = Math.floor(age / 12);
    let months = age % 12;
    let yrstring = (years != 0)? years + " year(s)" : "";
    let mstring = (months != 0)? months + " month(s)" : "";
    let and = (years != 0 && months != 0)? " and " : "";

    return yrstring + and + mstring + " old";
}

export default function BadgerBudSummary(props) {
    const [standard, setStandard] = useState(true);

    function saveCat() {
        alert(props.name + " has been added to your basket!");
        sessionStorage.setItem("savedCats", JSON.stringify([...JSON.parse(sessionStorage.getItem("savedCats")), props.id]));
        props.apply;
        props.remove(props.id);
    }

    return <div>
        {
            (standard)?
            <span>
                <img alt={"A picture of " + props.name} style={{width:"325px", height:"325px", objectFit:"fill"}}
                    src={"https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/" + props.imgIds[0]}/>
                <h2>{props.name}</h2>
                <button onClick={()=>{setStandard(false)}}>Show more</button>
            </span>
                :
                <span>
                    <Carousel style={{width:"325px", height:"325px"}}>
                        {
                            props.imgIds.map(img => {
                                return <Carousel.Item>
                                    <img alt={"A picture of " + props.name} style={{width:"325px", height:"325px", objectFit:"fill"}}
                                        src={"https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/" + img}/>
                                </Carousel.Item>
                            })
                        }
                    </Carousel>
                    <h2>{props.name}</h2>
                    <p>{props.gender}</p>
                    <p>{props.breed}</p>
                    <p>{calcAge(props.age)}</p>
                    <p>{("description" in props)?props.description:""}</p>
                    <button onClick={()=>{setStandard(true)}}> Show less</button>
                </span>
        }
        <button onClick={()=>{saveCat()}}>Save</button>
        <p></p>
    </div>;
}
