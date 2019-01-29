import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from "styled-components";

//Importing Canvas Elements
import phoneScreen from "./canvas";


// Define type of property
interface Props {
    tintColor: string;
    enabled: boolean;
    height: number;
    width: number;
}

interface States {
    enabled: boolean;
}


const Wrapper = styled<Props, any>("div")`
    width: 343px;
    height: 44px;
    background-color:green;
    display: flex;
    justify-content: flex-end;
` 

const ToggleCompStyle = styled<Props, any>("div")`
    width: 80px;
    height: 44px;
    border-radius: 40px;
    position: relative;
    transition: all 0.2s;
`

const ToggleElStyle = styled<Props, any>("div")`
    position: absolute;
    top: 6px;
    width: 32px;
    height: 32px;
    border-radius: 40px;
    transition: all 0.2s;
    background:white;
`

export class toggle extends React.Component<Partial<Props>, States> {

    // Set default properties
    static defaultProps = {
        width: 343,
        height: 44,
        tintColor: "#5C6061",
        enabled: false
    }

    // Items shown in property panel
    static propertyControls: PropertyControls<Props> = {
        enabled: { type: ControlType.Boolean, title: "Enabled"},
        tintColor: { type: ControlType.Color, title: "Tint"}
    }

    state = {
        enabled: this.props.enabled
    }

    componentWillReceiveProps(props: Props) {
        if(props.enabled !== this.props.enabled) {
            this.setState({ 
                enabled: props.enabled
            });
        }
    }

    handleClick = () => {
        this.setState({
            enabled: !this.state.enabled
        });
    }

    toggleSwitch() {
        return(
            <ToggleCompStyle
                onClick={this.handleClick}
                style={Object.assign(
                    {
                        background: this.state.enabled
                            ? this.props.tintColor
                            : "#DFE2E3"
                    }
                )}
            >
                <ToggleElStyle 
                    style={Object.assign(
                        {
                            left: this.state.enabled
                                ? this.props.width - (343 + ToggleCompStyle.width) + "px"
                                : "6px",
                            boxShadow: "0 1px 5px 0 rgba(0,0,0,0.25)"
                        }
                    )}
                />

            </ToggleCompStyle>  
        )
    }

    render() {
        return (
            <Wrapper>
                {this.toggleSwitch()}
            </Wrapper>
        );
    }
}
