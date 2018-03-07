import React from 'react';
import styled, { css } from "styled-components";
import Button from 'material-ui/Button';
import GameMatch from './game-match';
import '../css/styles.css';

function rowline (item,index){
    return(
    <tr key={index}>
      <td key={item.Username}>{item.Username}</td>
      <td key={item.Amount}>{item.Amount}</td>
      <td key={item.Status}>{item.Status}</td>
    </tr>)
  }

export default class GameLobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status:       "CHILLING",
            opponent:     "none",
            opponentName: "none",
            logX:        [{Username : "chuz",Amount : 55,Status : "received"}],
            win:          0,                                                                       //these are global to current
            lose:         0,                                                                       //    session, in constrast to
            tie:          0,                                                                       //    those on game-match
        };
        this.topicLobby =       "vertex.rps.lobby.dev";                                            //TODO: change dinamically
        this.ipfs =             this.props.session.ipfs;
        this.session =          this.props.session;
        this.opponentsPreName = {};                                                                //TODO: merge with opponentsName
        this.opponentsName =    {};                                                                //see line 40 & line 41

        this.onPing = function (msg) {
            try {msg.data = JSON.parse(msg.data.toString());} 
            catch (e) {return;}
            this.state.logX.push({Username: msg.from, Amount: 0, Status: msg.data.status})
            console.log(msg)
        }.bind(this);

        this.ping = function () {
            var msg = "";    
        }.bind(this);
    }

    componentWillMount() {
        setInterval(this.ping, 1000);
        console.log("ipfs.pubsub.subscribe: " + this.topicLobby);
        this.ipfs.pubsub.subscribe(this.topicLobby, this.onPing);
    }

    componentWillUnmount() {
        console.log("ipfs.pubsub.ubsubscribe: " + this.topicLobby);
        this.ipfs.pubsub.unsubscribe(this.topicLobby, this.onPing);
        clearInterval(this.ping);
    }

    peer(peerId, index) {
        return (
            <div key={"peer" + (index + 1)} className="clickable">
                <span>
                    {this.state.peers[peerId]}
                </span>
            </div>
        )
    }

    reset(result) {                                                       
        this.setState((prevState, props) => ({
            status: "CHILLING",
            opponent: "none",
            opponentName: "none",
            peers:{},
        }));                                                
    }

    setWin() {
        this.setState((prevState, props) => ({win: prevState.win + 1 }))
    }

    setLose() {
        this.setState((prevState, props) => ({lose: prevState.lose + 1 }))
    }

    setTie() {
        this.setState((prevState, props) => ({tie: prevState.tie + 1 }))
    }

    render() {
        return (
            <Div>
                <Nav>
                    <TextContent>Welcome {(this.props.session.state.name !== "")?(this.props.session.state.name):null}</TextContent>
                    <TextTitle>RPS Tournament Lobby</TextTitle>
                </Nav>\
                <Aside>
                    <TextOnline>some log </TextOnline>
                    <overflow>
                        <TableRowX class="listDataX" data={this.state.logX} />
                    </overflow>
                </Aside>
                <GameMatch ipfs={this.ipfs} peerId={this.props.peer.id} opponentId={this.state.opponent} session={this} />    
            </Div>
        );
    }
}

class TableRowX extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      var row = this.props.data.map((item,index) => rowline(item,index))
      
      return (
        <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
          {row}
          </tbody>
        </table>
      );
    }
  }

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
 `;

 const Span = styled.span`
    font-family: monospace, monospace;
 `;

const Nav = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #557359;
    
    @media (max-width: 300px) {
        padding: 2px;
    }
 `;

const Main = styled.div`
    padding: 3px;
    width: 100%;
    padding-top: 10px;
 `;

const Aside = styled.div`
    padding: 20px;
    width: 100%;
    background-color: #8FA690;
    display: flex;
    flex-direction: column;
    align-items: center;
 
    @media (max-width: 300px) {
        padding: 2px;
    }
 `;

const TextTitle = styled.h1`
    font-size: 20px;
    color: #EFF2E4;
    font-family: sans-serif;
    font-weight: 400;
 `;

const TextOnline = styled.h1`
    font-size: 17px;
    color: #EFF2E4;
    font-weight: 400;
    font-family: sans-serif;
 `;

const TextBar = styled.h2`
    font-size: 10px;
    font-family: monospace, monospace;

    @media (max-width: 723px) {
        font-size: 9px;
    }
 `;

const TextContent = styled.h3`
    font-size: 12px;
    color: #EFF2E4;
    font-weight: 400;
    font-family: sans-serif;
 `;

const TextPeer = TextContent.extend`
    font-family: monospace, monospace;
    font-size: 12px;
    
    @media (max-width: 723px) {
        font-size: 11px;
    }
 `;

const PeerButton = styled.button`
   font-family: monospace, monospace;
    font-size: 10px;
    text-decoration: none;
    padding: 7px;
    font-weight: 400;
    color: #ffffff;
    background-color: #8FA690;
    margin-right:auto;
 
    @media (max-width: 300px) {
        padding: 0px;
    }
    ${props => props.challenged && css`
        background: palevioletred;
        color: white;
    `}
`;


