import { Amplify } from 'aws-amplify';
import AWS from 'aws-sdk';
import { BrowserRouter } from 'react-router-dom';

// Features
import RoutesList from './routes';

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:a2eafb8f-2ffc-437a-a7c6-d344fa2d7b07',
    region: 'us-east-1',
    userPoolId: 'us-east-1_ocHYKrTh4', // Please change this value.
    userPoolWebClientId: '72g04gbdb9abitaekb8rui3ll4', // Please change this value.
  },
});

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
