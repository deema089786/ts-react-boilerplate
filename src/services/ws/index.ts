import io from 'socket.io-client';
import { apiURL } from '../../config';

class WebSocketClient {
  static connection: any = null;

  static connect = () => {
    WebSocketClient.connection = io(apiURL);
  };
}

export default WebSocketClient;
