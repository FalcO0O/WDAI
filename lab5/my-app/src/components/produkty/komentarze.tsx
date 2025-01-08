import {useEffect, useState} from "react";
import Komentarz from "./komentarz";

interface Comment {
    id: number;
    body: string;
    postId: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}

function Komentarze() {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/comments')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Błąd podczas pobierania danych');
                }
                return response.json();
            })
            .then((data) => {
                setComments(data.comments);
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania komentarzy:', error);
            });
    }, []);

    return (
        <div>
            <h2>Komentarze</h2>
            {comments.map((comment) => (
                <Komentarz
                    key={comment.id}
                    id={comment.id}
                    body={comment.body}
                    likes={Math.floor(Math.random() * 100)} // losowa liczba polubień dla każdego komentarza
                    postID={comment.postId}
                    user={{
                        id: comment.user.id,
                        username: comment.user.username,
                        fullName: `Użytkownik ${comment.user.id}`, // przykładowe imię i nazwisko
                    }}
                />
            ))}
        </div>
    );
}


export default Komentarze;