import {useState} from "react";

export default function BadgerBudSummary(props) {
    function unsaveCat() {
        alert(props.name + " has been removed from your basket!");
        sessionStorage.setItem("savedCats", JSON.stringify(JSON.parse(sessionStorage.getItem("savedCats")).filter(el => el != props.id)));
        props.apply;
        props.remove(props.id);
    }

    function adoptCat() {
        alert(props.name + " has been adopted!");
        sessionStorage.setItem("savedCats", JSON.stringify(JSON.parse(sessionStorage.getItem("savedCats")).filter(el => el != props.id)));
        sessionStorage.setItem("adoptedCats", JSON.stringify([...JSON.parse(sessionStorage.getItem("adoptedCats")), props.id]));
        props.apply;
        props.remove(props.id);
    }

    return <div>
        <img alt={"A picture of " + props.name} style={{width:"325px", height:"325px", objectFit:"fill"}}
            src={"https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/" + props.imgIds[0]}/>
        <h2>{props.name}</h2>
        <button onClick={()=>{unsaveCat()}}>Unselect</button>
        <button onClick={()=>{adoptCat()}}>Adopt</button>
        <p></p>
    </div>;
}