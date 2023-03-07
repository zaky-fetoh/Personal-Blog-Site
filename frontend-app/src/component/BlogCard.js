export default function BlogCard(props) {

    return <div>
        <h2> {props.title}</h2>
        <h5> {props.owner}</h5>
        <h6> {props.time} </h6>
        <p>{props.blog}</p>
    </div>
}