import React from "react";
import styled, { css } from "styled-components";

export default class GameMatch extends React.Component {
    constructor(props) {
        super(props);
        this.topic = "vertex.rps.match";
        this.state = {
            round:  0,
            mine:   "",
            theirs: "",
            result: "",
            ack:    0,
        };
        this.matchRecord = [];                                                                     //set on lines 87, 94 & 101
        this.ipfs = this.props.ipfs;
        this.status = this.props.status;

        this.pong = function(msg) {
            try {msg.data = JSON.parse(msg.data.toString());} 
            catch (e) {return;}
            this.matchRecord.push(msg);
            
        }.bind(this);

        this.ping = function() {                                                                   //set info to send as msg. Set at line 136
            let sx=1
        }.bind(this);
    }

    componentWillMount() {
        this.ping = setInterval(this.ping, 500);
        this.ipfs.pubsub.subscribe(this.topic, this.pong);
        console.log("ipfs.pubsub.subscribe: ", this.topic);
    }

    componentWillUnmount() {
        console.log("ipfs.pubsub.ubsubscribe: " + this.topic);
        this.ipfs.pubsub.unsubscribe(this.topic, this.pong);
        clearInterval(this.ping);
    }

    render() {
        return (
            <Div>
                {this.matchRecord}
            </Div>
        );
    }
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #8fa690;

    @media (max-width: 424px) {
        margin: 0;
        paddig: 0;
        justify-content: flex-start;
    }
`;