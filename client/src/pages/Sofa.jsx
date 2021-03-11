import React from "react";
import sofas from "../data"
import ItemCard from "../components/ItemCard";
import '../styles/Sofa.css'
// import Collapsible from 'react-collapsible';
import Accordion from '../components/Accordion'

function Title(){
    return <div className="Title">
        <h2>ghế sofa</h2>
    </div>
}

function MyAccordion(){
    return (
        <div className="MyAccordion">
            <div className="Accordion">
                <Accordion />
            </div>
        </div>
    );
}

function ItemList(){
    return <div className="ItemList">
            {
                sofas.map( sofa => {
                    return <ItemCard props={sofa} />
                })
            }
    </div>
}

function Sofa(props) {
  return <div className="Sofa">

        <Title/>
        <div className="Sofa__inner">
            <MyAccordion />
            <ItemList />
        </div>
        
  </div>;
}

export default Sofa;
