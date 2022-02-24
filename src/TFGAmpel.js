import { Component } from 'react';
import './ampel.css';

class TFGAmpel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 0, 
             stateList : {
                 0:[true, false, false],
                 1:[true, true, false],
                 2:[false, false, true],
                 3:[false, true, false]
                }
        }
    }
    switchState (context , stateid) {
        switch(stateid){
            case 0:
                context.setState({currentState: 1});
                setTimeout(context.switchState, 1000, context, 1);
                break;
            case 1:
                context.setState({currentState: 2});
                setTimeout(context.switchState, 1000, context, 2,);
                break;
            case 2:
                context.setState({currentState: 3});
                setTimeout(context.switchState, 1000, context, 3);
                break;
            case 3:
                context.setState({currentState: 0});
                break;
            default:
                console.log("HELP!")
        }
    }
    componentDidMount(){
        if(this.props.active){
            setTimeout(this.switchState, 1000, this, 0);
        }
    }
    componentDidUpdate(){
        if(this.props.active && this.state.currentState === 0){
            setTimeout(this.switchState, 1000, this, 0);
        }
    }
    render() { 
        return ( 
            <span className = 'ampel-wrapper'>
                <div className = {(this.state.stateList[`${this.state.currentState}`][0] ? '' : 'grey') + ' red light'}></div>
                <div className = {(this.state.stateList[`${this.state.currentState}`][1] ? '' : 'grey') + ' orange light'}></div>
                <div className = {(this.state.stateList[`${this.state.currentState}`][2] ? '' : 'grey') + ' green light'}></div>
            </span>
         );
    }
}
 
export default TFGAmpel;