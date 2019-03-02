import React, { Component } from 'react';
import AccessoriesBox from '/imports/web/Accessories/AccessoriesBox.jsx';
export default class Accessories extends Component {
    render(){
        return(
            <div className="guitar-accessr-container container-fluid">
                <h1 className="accessr text-center">
                    Lot's of Accessories
                </h1>
                {/* <h4 className="accessr-para">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt sapiente eius deserunt amet, quam sint autem cumque maiores dolor repellendus reprehenderit alias accusantium, asperiores aspernatur a aliquid numquam blanditiis est sit similique. Nulla, repellendus rem. Atque quis, earum praesentium in inventore ipsum! Sapiente consectetur adipisci sed iusto dolores, debitis vel!
                </h4> */}
                <AccessoriesBox />
            </div>    
        );
    }
}