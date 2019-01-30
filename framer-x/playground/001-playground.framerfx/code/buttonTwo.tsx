import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { Button } from "./canvas"; ​


// Define type of property
interface Props {
    text: string;
    width: number;
    height: number;
}

export class buttonTwo extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        text: "He World!",
        width: "100%",
        height: 50,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { 
            type: ControlType.String, 
            title: "Text" 
        },
    }

    render() {
        return(
            <div style={outer}>
                <div style={inner}>
                    <h1 style={{color:"white"}}>{this.props.text}</h1>
                </div>
            </div>
        );
    }
}


const outer: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    background: "rgba(136, 85, 255, 0.4)",
    overflow: "hidden",
};

const inner: React.CSSProperties = {
    height: "100%",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    background: "rgba(136, 185, 255, 0.7)",
    overflow: "hidden",
};