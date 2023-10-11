import React, { useEffect } from 'react';
import Navigation from './components/commonNavigator';
import { getDBConnection, initDatabase } from './utils/db';

export default function App() {
  useEffect(
    function () {
      async function init() {
        await initDatabase();
      }
      init();
    }, []
  );
  return (
    <Navigation />
  );
}