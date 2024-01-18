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
  const [filteredData, setFilteredData] = useState(data)

  console.log('start of function', filteredData)

  useEffect(() => {
    const initialData = data.map((item) => {
      let initialPrice = item.price
      if(weightUnits === 'g'){
        initialPrice = ((item.price * weight) / 1000).toFixed(2)
      }
      else {
        initialPrice = (item.price * weight).toFixed(2)
        console.log('else cond',initialPrice)
      }
      return {...item, calculatedPrice: initialPrice}
    })
    setFilteredData(initialData)

  }, [weightUnits, weight])

  function handleSearchChange(event) {
    const { value } = event.target
    console.log('youre typing something new')
    setSearchTerm(value)
    filterData(value)
  }

  function handleWeightChange(e) {
    console.log('weight change', e.target.value)
    const newWeight = e.target.value
    setWeight(newWeight)

  }

  function handleUnitsChange(e) {
    console.log('unit change', e.target.value)

    let newUnits = e.target.value
    setWeightUnits(newUnits)

  }

  function filterData(searchTerm) {
    const filteredData = data.filter((item) => {
      return item.item.toLowerCase().includes(searchTerm.toLowerCase())
    })
    console.log(filteredData)
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
              <ListItem key={item.id} name={item.item} brand={item.brand} price={item.calculatedPrice}
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
