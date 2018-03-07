import React from 'react';
import styled from "styled-components";
import GameLobby from './game-lobby';
import GameConnection from './game-connection';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            peer: {},
            status: "none",
            date: new Date(),
            points: 0,
            openNameDialog: false,
            openConfigDialog: false,
            totalWins: 0,
            usernameHash: "none",
        };
        this.ipfs = props.ipfs;
        
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),1000);                                        //Init counterclock
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    setPoints(result){
        if (result === "win"){
            this.setState( {
                points: this.state.points + 3,
                totalWins: this.state.totalWins + 1,
            });
        }
        else if (result === "tie"){
            this.setState({
                points: this.state.points + 1
            });
        };
    }

    setPeer(peer) {                                                                                //called from game-connection
        this.setState({peer: peer});
    }

    setStatus(status) {
        this.setState({ status: status});                                                          //called from game-connection
    }

    tick() {
        this.setState({
            date: this.timeUntilEndline(),
        });
    }

    timeUntilEndline() {
        var deadline = 'December 31 2018 23:59:59 GMT+0600';                                       //TODO: set correct date
        var t = Date.parse(deadline) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return (<span>{days} days with {hours}:{minutes}:{seconds} until RPS Tournament begins</span>)
    }

    render() {
        return (
            <Div>
                <Toolbar>
                    <div>
                        <TextConnection><span>{(this.state.status !== "none") ? this.state.date : null}</span></TextConnection>
                    </div>
                </Toolbar>
                {this.state.status !== "none" ? (<GameLobby session={this} peer={this.state.peer} status={this.state.status} usernameHash={this.state.usernameHash}/>) : (null)}
                <Footer>
                    <GameConnection session={this} />
                </Footer>
            </Div>
        );
    }
};

const Toolbar = styled.div`
   min-height: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #162614;
`;

const Footer = styled.div`
    margin-top: auto;
`;

const Div = styled.div`
    margin: 0 auto;
    width: 50%;
    background-color: #8FA690;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    @media (max-width: 1024px) {
        width: 100%;
      }
`;

const TextConnection = styled.h2`
    font-size: 11px;
    font-family: sans-serif;
    font-weight: 100;
    color: #EFF2E4;
`;

