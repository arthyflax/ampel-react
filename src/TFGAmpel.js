import { Component } from "react";
import "./ampel.css";

class TFGAmpel extends Component {
    constructor(props) {
        super(props);
        this.timeout = [];
        this.state = {
            currentState: 0,
            stateList: [
                {
                    0: [true, false, false],
                    1: [true, true, false],
                    2: [false, false, true],
                    3: [false, true, false]
                },
                { 0: [true, false, false], 1: [true, false, false], 2: [false, false, true], 3: [true, false, false] }
            ]
        };
    }

    switchState(stateid) {
        switch (stateid) {
            case 0:
                this.setState({ currentState: 1 });
                this.timeout = setTimeout(this.switchState.bind(this), 1000, 1);
                break;
            case 1:
                this.setState({ currentState: 2 });
                setTimeout(this.switchState.bind(this), 2000, 2);
                break;
            case 2:
                this.setState({ currentState: 3 });
                setTimeout(this.switchState.bind(this), 1000, 3);
                break;
            case 3:
                this.props.next(this.props.id);
                this.setState({ currentState: 0 });
                break;
        }
    }

    componentDidMount() {
        if (this.props.active) {
            setTimeout(this.switchState.bind(this), 1000, 0);
        }
    }

    componentDidUpdate() {
        if (this.props.active && this.state.currentState === 0) {
            setTimeout(this.switchState.bind(this), 1000, 0);
        }
    }

    render() {
        if (this.props.type === "Auto") {
            return (
                <span className="ampel-wrapper">
                    <div className={(this.state.stateList[0][`${this.state.currentState}`][0] ? "" : "grey") + " red light"}></div>
                    <div className={(this.state.stateList[0][`${this.state.currentState}`][1] ? "" : "grey") + " orange light"}></div>
                    <div className={(this.state.stateList[0][`${this.state.currentState}`][2] ? "" : "grey") + " green light"}></div>
                </span>
            );
        } else if (this.props.type === "Fußgänger") {
            return (
                <span className="ampel-wrapper">
                    <div className={(this.state.stateList[1][`${this.state.currentState}`][0] ? "" : "grey") + " red light"}></div>
                    <div className={"light"}></div>
                    <div className={(this.state.stateList[1][`${this.state.currentState}`][2] ? "" : "grey") + " green light"}></div>
                </span>
            );
        }
    }
}

export default TFGAmpel;
