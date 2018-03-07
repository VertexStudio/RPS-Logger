import IPFS from 'ipfs';
import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({                                                                     //overrides colors and settings of theme
  palette: {
    primary: {
      main: '#162614',
    },
    secondary: {
      main: '#EFF2E4', 
    },
    textColor: '#EFF2E4',
  },
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #162614 20%, #254021 30%)",
        color: '#CFD8DC',
        height: 28,
        padding: "0 10px",
        textTransform: 'none',
        fontFamily: "sans-serif",
      },
    },
  },
});

class GameWorld extends React.Component {
  constructor(props) {
    super(props);
    this.ipfs = this.ipfs = new IPFS({
        EXPERIMENTAL: { pubsub: true },
        online: true,
        config: {
            Addresses: {
                API: "/ip4/127.0.0.1/tcp/5001",
                Announce: [],
                Gateway: "/ip4/127.0.0.1/tcp/8080",
                NoAnnounce: [],
                Swarm: [
                    "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"
                ]
            },
            Bootstrap: [
                "/ip4/192.168.0.27/tcp/4001/ipfs/QmWvsZ1ZxLMa5aB6MMtG8nJvFZ6HsiLgx5RpP9DX7qpjPo"
            ]
        }
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Game ipfs={this.ipfs} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<GameWorld />, document.querySelector('#sceneContainer'));
