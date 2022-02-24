import { Component } from "react";
import TFGAmpel from "./TFGAmpel";

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
        for (let i = this.state.active; i < this.state.Ampeln.length; i++) {
            if (this.state.Ampeln[i] === "Auto" && this.state.active !== i) {
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
            if (nextIndex === undefined) {
                nextIndex = 0;
            }
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
                case "ArrowRight":
                    this.setState({ timeMultiplier: this.state.timeMultiplier - 0.125 });
                    break;
                case "ArrowLeft":
                    this.setState({ timeMultiplier: this.state.timeMultiplier + 0.125 });
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
                {this.state.Ampeln.map((Ampel, index) => {
                    return (
                        <TFGAmpel
                            key={index}
                            id={index}
                            type={Ampel}
                            active={this.state.active === index || (Ampel === "Fußgänger" && this.state.pedestrian)}
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
