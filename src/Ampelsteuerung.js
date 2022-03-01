import { Component } from "react";
import Ampel from "./Ampel";

class Ampelsteuerung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Ampeln: ["Auto", "Fußgänger", "Auto", "Fußgänger", "Auto", "Auto", "Fußgänger", "Auto", "Auto", "Auto"],
            active: -1,
            pedestrian: false,
            timeMultiplier: 1.0
        };
    }

    next(callerId) {
        if (callerId !== this.state.active) {
            return;
        }
        let nextIndex;
        if (this.state.pedestrian) this.setState({ pedestrian: false, active: -1 });
        for (let i = this.state.active + 1; i < this.state.Ampeln.length; i++) {
            if (this.state.Ampeln.length <= i) break;
            if (this.state.Ampeln[i] === "Auto") {
                nextIndex = i;
                break;
            }
        }
        if (nextIndex === undefined) {
            this.setState({ pedestrian: true });
            for (let i = 0; i < this.state.Ampeln.length; i++) {
                if (this.state.Ampeln[i] === "Fußgänger") {
                    nextIndex = i;
                    break;
                }
            }
        }

        if (nextIndex === undefined) {
            nextIndex = 0;
        }
        this.setState({ active: nextIndex });
    }

    componentDidMount() {
        document.addEventListener("keyup", (event) => {
            let newAmpeln;
            switch (event.key) {
                case "a":
                    newAmpeln = this.state.Ampeln.slice();
                    newAmpeln.push("Auto");
                    this.setState({ Ampeln: newAmpeln });
                    break;
                case "f":
                    newAmpeln = this.state.Ampeln.slice();
                    newAmpeln.push("Fußgänger");
                    this.setState({ Ampeln: newAmpeln });
                    break;
                case "r":
                    newAmpeln = this.state.Ampeln.slice();
                    newAmpeln.pop();
                    this.setState({ Ampeln: newAmpeln });
                    break;
                case "ArrowUp":
                    if (this.state.timeMultiplier <= 1) {
                        this.setState({ timeMultiplier: (3 / 4) * this.state.timeMultiplier });
                    } else {
                        this.setState({ timeMultiplier: this.state.timeMultiplier - 0.25 });
                    }
                    break;
                case "ArrowDown":
                    if (this.state.timeMultiplier < 1) {
                        this.setState({ timeMultiplier: (4 / 3) * this.state.timeMultiplier });
                    } else {
                        this.setState({ timeMultiplier: this.state.timeMultiplier + 0.25 });
                    }
                    break;
                default:
                    break;
            }
        });
        this.next(-1);
    }

    componentDidUpdate() {
        if (this.state.active > this.state.Ampeln.length - 1) {
            for (let i = 0; i < this.state.Ampeln.length; i++) {
                if (this.state.Ampeln[i] === "Auto" && this.state.active !== i) {
                    this.setState({ active: i });
                    break;
                }
            }
        }
    }

    render() {
        return (
            <>
                {this.state.Ampeln.map((AmpelArt, index) => {
                    return (
                        <Ampel
                            key={index}
                            id={index}
                            type={AmpelArt}
                            active={this.state.active === index || (AmpelArt === "Fußgänger" && this.state.pedestrian)}
                            next={this.next.bind(this)}
                            timeMultiplier={this.state.timeMultiplier}
                        />
                    );
                })}
            </>
        );
    }
}

export default Ampelsteuerung;
