import React, {useEffect, useState} from 'react';
import '../../App.css';

interface Student {
    imie: string;
    nazwisko: string;
    rok: number;
}

function Studenci() {
    const [students, setStudents] = useState<Student[]>([
        { imie: 'Robert', nazwisko: 'Makłowicz', rok: 1968 },
        { imie: 'Magda', nazwisko: 'Gessler', rok: 1973 },
        { imie: 'Piotr', nazwisko: 'Żyła', rok: 1986 },
    ]);

    return (
        <>
            <table cellPadding={20} border={1} >
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rok}</td>
                    </tr>
                ))}
            </table>
            <Dodawanie f={ (newStudent) => setStudents([...students, newStudent]) } />
        </>
    );
}


function Dodawanie(props : {f : (student : Student) => void}) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [year, setYear] = useState(0);
    return (
        <div >
            <input type="text" placeholder={"Imie"} className={"add"} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={"Nazwisko"} className={"add"} onChange={(e) => setSurname(e.target.value)}/>
            <input type="number" placeholder={"Rocznik"} className={"add"} onChange={(e) => setYear(e.target.valueAsNumber)}/>
            <button onClick={() => {
                if(name && surname && year) {
                    props.f({imie: name, nazwisko: surname, rok: year})
                } else alert("Niepoprawne dane");
            }}>Dodaj</button>
        </div>
    );
}

export default Studenci;
