import { Link } from "react-router-dom";


export default function BlogHeaderCard(props) {

    return <div>
        <h2> {props.title}</h2>
        <h5> {props.owner}</h5>
        <h6> {props.time} </h6>
        <Link to={`/${props.id}`}>View</Link>
    </div>
}