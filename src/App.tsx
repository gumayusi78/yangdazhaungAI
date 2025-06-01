import { HashRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </HashRouter>
  );
}

export default App;