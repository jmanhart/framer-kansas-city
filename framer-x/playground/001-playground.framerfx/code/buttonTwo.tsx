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
        text: "_String Needed_",
        buttonKind: "Hello",
        width: 343,
        height: 48,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { 
            type: ControlType.String, 
            title: "Button Label" 
        },
        buttonKind: {
            type: ControlType.Enum, 
            title: "Enum",
            options: ["A", "B", "C"],
            optionTitles: [
                "Primary", 
                "Secondary", 
                "Tertiary"
            ]
        }
    }




    render() {
        return(
            <div style={outer}>
                <div style={inner}>
                    <span style={buttonLabel}>{this.props.text}</span>
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
    background: "rgba(136, 85, 255, 0.0)",
    overflow: "hidden",
};

const inner: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    background: "#11A9ED",
    overflow: "hidden",
    borderRadius: 4,
};

const buttonLabel: React.CSSProperties = {
    fontSize: 17,
    color: 'white'
};