

function Przycisk(props : {onAdd : () => void}) {
    return (
        <button onClick={props.onAdd}>Dodaj</button>
    )
}

export default Przycisk;