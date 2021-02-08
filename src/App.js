import './App.css';
import Calendar from './components/Calendar';

function App() {
  const date = new Date(Date.now());
  // const date = new Date('2020-09-29');
  return (
    <div className="App">
      <Calendar date={date}/>
    </div>
  );
}

export default App;
