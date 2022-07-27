
function Card(props) {
    return ( 
        <div className="shadow-lg rounded-xl w-full h-24 py-5 px-6 border-[1px]">
            <p className="italic">{props.title}</p>
            <p className="text-xl">{props.content}</p>
        </div>
    );
}

export default Card;
