export default function ListItem(props) {
    return (
        <div className="list-item">
            <li>{props.name}</li>
            {props.emoji && <span>{props.emoji}</span>}
            {props.brand && <span>({props.brand})</span>}
            {props.price && <span className="price">${props.price}</span>}
            
        </div>
    )
}