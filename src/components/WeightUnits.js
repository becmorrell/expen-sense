export default function WeightUnits(props) {
    return (
        <div className="units-container">
            <input type="number" value={props.weight} placeholder="Weight" onChange={props.onWeightChange}/>
            <select value={props.units} onChange={props.onUnitChange}>
                <option>lb</option>
                <option>kg</option>
                <option>g</option>
            </select>
        </div>
    )
}