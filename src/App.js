import './App.css';
import data from './data/data.json'
import ItemTitle from './components/Title';
import SearchBar from './components/SearchBar';
import WeightUnits from './components/WeightUnits';
import { useEffect, useState } from 'react';
import ListItem from './components/ListItem';

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [weight, setWeight] = useState(1)
  const [weightUnits, setWeightUnits] = useState('kg')
  const [weightKG, setWeightKG] = useState(1) 
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    switch(weightUnits){
      case "kg":
        setWeightKG(weight)
        break;
      
      case "g":
        setWeightKG(weight / 1000);
        break;
      
      case "lb":
        setWeightKG(weight * 0.453592)
        break;
      
      default:
        setWeightKG(weight)
    }

  }, [weightUnits, weight])

  function handleSearchChange(event) {
    const { value } = event.target
    setSearchTerm(value)
    filterData(value)
  }

  function handleWeightChange(e) {
    const newWeight = e.target.value
    setWeight(newWeight)
  }

  function handleUnitsChange(e) {
    let newUnits = e.target.value
    setWeightUnits(newUnits)
  }

  function filterData(searchTerm) {
    const filteredData = data.filter((item) => {
      return item.item.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredData(filteredData)
  }

  return (
    <div className="App">
      <div className='App-container'>
          <h1>ExpenSense</h1>
          <SearchBar item={searchTerm} onSearchChange={handleSearchChange} />
          <ItemTitle name={searchTerm}></ItemTitle>
          <WeightUnits units={weightUnits} weight={weight} onUnitChange={handleUnitsChange} onWeightChange={handleWeightChange}></WeightUnits>

          <div>
          <ul className='list-container'>
            { searchTerm && filteredData.map((item) => (
              <ListItem key={item.id} name={item.item} brand={item.brand} price={(item.price * weightKG).toFixed(2)}
               emoji={item.emoji}></ListItem>
            ))
            }
          </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
