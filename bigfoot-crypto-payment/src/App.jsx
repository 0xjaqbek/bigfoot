import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import PaymentFlow from './components/PaymentFlow';

function App() {
  // TonConnect manifest URL for GitHub Pages
  const manifestUrl = window.location.origin + '/bigfoot/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="App">
        <PaymentFlow />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;