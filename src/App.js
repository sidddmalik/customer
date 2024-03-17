import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter,Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import CreateConsumer from './components/CreateConsumer';
import ConsumerList from './components/ConsumerList';
import EditConsumer from './components/EditConsumer';
function App() {
  return (
    <div class="container">
      <HashRouter>
        <Nav />
        <ConsumerList/>
        <Routes>
          <Route path="/create-service" element={<CreateConsumer />} />
          <Route path="/service-list" element={<ConsumerList />} />
          <Route path="/edit-service/:id" element={<EditConsumer />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

