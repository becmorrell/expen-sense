export default function SearchBar(props){
    console.log(props)
    return (
        <form className="form-container">
            <label className="search-label" htmlFor="search">Search for an item:</label>
            <input type="text" id="search" value={props.item} placeholder="Search for an item"
            onChange={props.onSearchChange}/>
            <button type="submit" onClick={props.onSearchClick}>Search</button>
        </form>
    )
}