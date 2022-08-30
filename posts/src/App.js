import { Navigate } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Containers/HeaderContainer';
import Content from './components/Content';
import Navbar from './components/Navbar';

function App(props) {
  if (!props.isLogin){
    return (
      <Navigate to="/login" />
    )
  }
  return (
    <div className="App">
        <HeaderContainer/>
        <Navbar/>
        <Content/>
    </div>
  );
}

export default App;
