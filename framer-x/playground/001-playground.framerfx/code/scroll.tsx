import * as React from "react";
import { PropertyControls, ControlType, Frame, Scroll, Stack } from "framer";

import { rowEpisode } from "./canvas"; 

// Define type of property
interface Props {
    text: string;
}

export class scroll extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        text: "Hello World!",
        width: 375,
        height: 667,
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { type: ControlType.String, title: "Text" },
    }

    render() {
        return(
            <Scroll 
                style={scrollStyles} 
                width={this.props.width} 
                height={this.props.height} 
                contentOffsetY={0}
            >
                <Stack direction={"vertical"}>
                    <p style={{backgroundColor:'yellow', width: 200}}>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                </Stack>
            
            </Scroll>
            
        ) 
    }
}

const scrollStyles: React.CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.1)"
}

const style: React.CSSProperties = {
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#8855FF",
    background: "rgba(136, 85, 255, 0.5)",
    overflow: "hidden",
};