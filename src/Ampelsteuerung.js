import { Component } from "react";
import TFGAmpel from "./TFGAmpel";

class Ampelsteuerung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Ampeln: ["Auto", "Fußgänger", "Auto", "Auto", "Fußgänger", "Auto", "Auto", "Fußgänger"],
            active: -1,
            pedestrian: false
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
                if (this.state.Ampeln[i] === "Fußgänger" && this.state.active !== i) {
                    nextIndex = i;
                    break;
                }
            }
        }

        this.setState({ active: nextIndex });
    }

    componentDidMount() {
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
            <div>
                {this.state.Ampeln.map((Ampel, index) => {
                    return (
                        <TFGAmpel
                            key={index}
                            id={index}
                            type={Ampel}
                            active={this.state.active === index || (Ampel === "Fußgänger" && this.state.pedestrian)}
                            next={this.next.bind(this)}
                        />
                    );
                })}
                <button
                    onClick={() => {
                        let newAmpeln = this.state.Ampeln.slice();
                        newAmpeln.push("Auto");
                        this.setState({ Ampeln: newAmpeln });
                    }}
                    className="button">
                    add
                </button>
                <button
                    onClick={() => {
                        let newAmpeln = this.state.Ampeln.slice();
                        newAmpeln.pop();
                        this.setState({ Ampeln: newAmpeln });
                    }}
                    className="button">
                    unadd
                </button>
            </div>
        );
    }
}

export default Ampelsteuerung;
