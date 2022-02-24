import { Component } from 'react';
import TFGAmpel from "./TFGAmpel";

class Ampelsteuerung extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Ampeln:["A", "A", "A", "A", "A", "A"],
            active:0,
            size:45
         }
    }
    loop(context){
        let content = [];
        let nextIndex;
        // let nextContent = [];
        context.state.Ampeln.forEach((Ampel, index) => {
            if(Ampel === "A"){
                content.push(<TFGAmpel key = {index} active = {context.state.active === index}/>)
                // nextContent.push(<TFGAmpel key = {index} active = {context.state.active === index}/>)
                // context.setState({active:nextIndex, content:nextContent})
                for(let i = index + 1; i < context.state.Ampeln.length; i++){
                    if(context.state.Ampeln[i] === "A" && context.state.active === index){
                        nextIndex = i;
                        break;
                    }

                }
                if(context.state.active === context.state.Ampeln.length - 1){
                    nextIndex = 0
                    console.log(context.state.active)
                }
            }
        })
        context.setState({active:nextIndex, content:content})
        setTimeout(context.loop, 3500, context)
    }
    componentDidMount(){
        this.loop(this);
        
    }
    // componentDidUpdate(){
    //     if(this.state.active === this.state.Ampeln.length){
    //         this.setState({active:0})
    //         setTimeout(this.loop, 3500, this)
    //     }
    // }
    render() { 
        return ( 
            <div>
            {this.state.content}
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