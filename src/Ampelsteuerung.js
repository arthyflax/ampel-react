import { Component } from 'react';
import TFGAmpel from "./TFGAmpel";

class Ampelsteuerung extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Ampeln:["A", "A", "A", "A", "A"],
            active:0
         }
    }

    next(callerId){
        if (callerId !== this.state.active){
            return;
        }
        console.log("called")
        let nextIndex;
        let length = this.state.Ampeln.length
        for(let i = this.state.active; i < length; i++){
            if(this.state.Ampeln[i] === "A" && this.state.active !== i){
                nextIndex = i;
                break;
            }
            
        }
        if(nextIndex === undefined){
            nextIndex = 0;
        }
        
        this.setState({active:nextIndex})
    }
    componentDidUpdate(){
        if(this.state.active > this.state.Ampeln.length - 1){
            this.setState({active:0})
        }
    }
    render() {
        console.log("render")
        console.log(this.state.active) 
        return ( 
            <div>
            {this.state.Ampeln.map((Ampel, index)=>{
                return <TFGAmpel key = {index} id = {index} active = {this.state.active === index} next = {this.next.bind(this)}/>
            })}
                <button onClick = {() => {
                    let newAmpeln = this.state.Ampeln.slice();
                    newAmpeln.push("A");
                    this.setState({Ampeln:newAmpeln})
                }} className = "button">
                    add
                </button>
                <button onClick = {() => {
                    let newAmpeln = this.state.Ampeln.slice();
                    newAmpeln.pop();
                    this.setState({Ampeln:newAmpeln})
                }} className = "button">
                    unadd
                </button>
            </div>
         );
    }
}
 
export default Ampelsteuerung;