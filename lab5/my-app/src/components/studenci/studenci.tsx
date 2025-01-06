import React from 'react';

interface Student {
    imie: string;
    nazwisko: string;
    rok: number;
}

function Studenci() {
    const Students: Student[] = [
        { imie: 'Robert', nazwisko: 'Makłowicz', rok: 1968 },
        { imie: 'Magda', nazwisko: 'Gessler', rok: 1973 },
        { imie: 'Piotr', nazwisko: 'Żyła', rok: 1986 },
    ];

    return (
        <table>
            {Students.map((student, index) => (
                <tr key={index} >
                    <td>{student.imie}</td>
                    <td>{student.nazwisko}</td>
                    <td>{student.rok}</td>
                </tr>
            ))}
        </table>
    );
}

export default Studenci;
