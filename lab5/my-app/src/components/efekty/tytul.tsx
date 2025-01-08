import {useEffect, useState} from "react";

function Tytul()
{
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        document.title = title;
    }, [title]);

    return(
        <input onChange={(e) => setTitle(e.target.value)} type="text"/>
    );
}

export default Tytul;


