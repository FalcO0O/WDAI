

function Przycisk(props : {onZwieksz : () => void}) {
    return (
        <button onClick={props.onZwieksz}>Dodaj</button>
    )
}

export default Przycisk;