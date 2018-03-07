import React from 'react';
import styled from "styled-components";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import SettingsIcon from 'material-ui-icons/Settings';

export default class GameConnection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peer: "none",
        };
        this.ipfs = props.session.ipfs;
    }

    componentWillMount() {
        this.ipfs.on('ready', () => {
            console.log("IPFS.on: ready");
            this.ipfs.id((err, peer) => {
                if (err) {
                    console.log("IPFS.id error: ", err);
                    return;
                };
                this.setState({peer: peer,});
                this.props.session.setPeer(peer);                                                  //change props of father
                this.props.session.setStatus("WAITING");                                           //change props of father
            })
        });
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <div>
                            <br />
                            <TextConnection>CONNECTION </TextConnection><br/>
                            <TextConnection>Player Status:</TextConnection><TextPeer>{this.props.session.state.status}</TextPeer>
                        </div>
                    </Toolbar>
                    <configButton>
                            <Button onClick={this.props.session.handleClickOpenConfig}>Configuration<SettingsIcon/></Button>
                        </configButton>
                </AppBar>
            </div>
        );
    }
};


const TextConnection = styled.h2`
    font-size: 12px;
    font-family: sans-serif;
    font-weight: 100;
`;

const TextPeer = TextConnection.extend`
    font-family: monospace, monospace;
`;

const TextPeers = TextConnection.extend`
    font-family: monospace, monospace;

    @media (max-width: 723px) {
        font-size: 8px;
    }
`;

const configButton = styled.div`
    display: flex;
`;