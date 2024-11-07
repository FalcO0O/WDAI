let boardSize = 8; /* początkowe wartości dla easy level */
let maxWords = 5;
const board = [];
let words = [];
let foundWords = new Set();

// Funkcja do ustawienia poziomu trudności i startowania rozgrywki
function setDifficulty(size, wordCount) {
    boardSize = size;
    maxWords = wordCount;
    foundWords = new Set();
    document.getElementById("word-list").classList.add("hidden");
    loadWords();
}

// Funkcja do losowego wybierania słów z wczytanej bazy
function getRandomWords(wordList, count) {
    const selectedWords = [];
    while (selectedWords.length < count) {
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        if (!selectedWords.includes(word)) selectedWords.push(word);
    }
    return selectedWords;
}

// Wczytywanie słów z pliku JSON, od razu odsiewamy elementy które nie mogą zostać użyte (są za duże)
async function loadWords() {
    const response = await fetch('words.json');
    const data = await response.json();

    // Filtrujemy słowa, aby ich długość nie przekraczała boardSize
    const filteredWords = data.words.filter(word => word.length <= maxWords);

    // Losujemy słowa do krzyżówki
    words = getRandomWords(filteredWords, maxWords);

    generateCrossword();
}

// Funkcja do losowania pozycji początkowego słowa
function getRandomPosition() {
    return {
        row: Math.floor(Math.random() * boardSize),
        col: Math.floor(Math.random() * boardSize),
        direction: Math.random() < 0.5 ? 'horizontal' : 'vertical'
    };
}

// Funkcja sprawdzająca, czy słowo zmieści się na planszy w danym kierunku
function canPlaceWord(word, row, col, direction) {
    if (direction === 'horizontal' && col + word.length > boardSize) return false;
    if (direction === 'vertical' && row + word.length > boardSize) return false;
    for (let i = 0; i < word.length; i++) {
        if (direction === 'horizontal' && board[row][col + i] !== '' && board[row][col + i] !== word[i]) return false;
        if (direction === 'vertical' && board[row + i][col] !== '' && board[row + i][col] !== word[i]) return false;
    }
    return true;
}

// Funkcja umieszczająca słowo na planszy
function placeWord(word) {
    let placed = false;
    while (!placed) {
        const { row, col, direction } = getRandomPosition();
        if (canPlaceWord(word, row, col, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === 'horizontal') board[row][col + i] = word[i];
                else board[row + i][col] = word[i];
            }
            placed = true;
        }
    }
}

// Funkcja wypełniająca wolne miejsca losowymi literami
function fillEmptySpaces() {
    const alphabet = "ABCDEFGHIJKLMNOPRSTUWYZĄĘĆŻŹŃŁŚÓ";
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === '') {
                board[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }
}

// Generowanie planszy na podstawie rozmiaru i liczby słów
function generateCrossword() {
    board.length = 0; // Czyścimy tablicę planszy
    for (let i = 0; i < boardSize; i++) {
        board.push(Array(boardSize).fill(''));
    }
    words.forEach(placeWord);
    fillEmptySpaces();
    renderBoard();
    renderWordList();
}

// Funkcja do wyświetlania planszy i listy słów
function renderBoard() {
    const table = document.getElementById('crossword');
    table.innerHTML = ''; // Czyszczenie tabeli przed dodaniem komórek
    board.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

function renderWordList() {
    const list = document.getElementById('words');
    list.innerHTML = ''; // Czyszczenie listy przed dodaniem słów
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.classList.add("word-item");
        list.appendChild(li);
    });
}

// Zmienne śledzące zaznaczanie myszą
let isMouseDown = false;
let selectedCells = [];
let startCell = null;
let direction = null;

function handleMouseDown(event) {
    isMouseDown = true;
    event.target.classList.add("highlight");
    selectedCells = [event.target];
    startCell = event.target;
    direction = null;
}

/* funkcja sprawdza czy kolejna litera jest w lini prostej (zeby nie mozna było robić zygzaków) */
function handleMouseEnter(event) {
    if (isMouseDown) {
        const currentCell = event.target;

        const [startRow, startCol] = [startCell.parentNode.rowIndex, startCell.cellIndex];
        const [currentRow, currentCol] = [currentCell.parentNode.rowIndex, currentCell.cellIndex];

        // Ustal kierunek przy pierwszym ruchu
        if (!direction) {
            if (startRow === currentRow) direction = "horizontal";
            else if (startCol === currentCol) direction = "vertical";
            else return; // Jeśli kierunek jest po skosie, zignoruj zaznaczenie
        }

        // Sprawdzenie sąsiedztwa dla dodania na początek lub koniec
        const firstCell = selectedCells[0];
        const lastCell = selectedCells[selectedCells.length - 1];
        const [firstRow, firstCol] = [firstCell.parentNode.rowIndex, firstCell.cellIndex];
        const [lastRow, lastCol] = [lastCell.parentNode.rowIndex, lastCell.cellIndex];

        if (direction === "horizontal" && startRow === currentRow) {
            // Dodanie na początek lub koniec w poziomie
            if (currentCol === firstCol - 1) {
                selectedCells.unshift(currentCell);
                currentCell.classList.add("highlight");
            } else if (currentCol === lastCol + 1) {
                selectedCells.push(currentCell);
                currentCell.classList.add("highlight");
            }
        } else if (direction === "vertical" && startCol === currentCol) {
            // Dodanie na początek lub koniec w pionie
            if (currentRow === firstRow - 1) {
                selectedCells.unshift(currentCell);
                currentCell.classList.add("highlight");
            } else if (currentRow === lastRow + 1) {
                selectedCells.push(currentCell);
                currentCell.classList.add("highlight");
            }
        }
    }
}



/* Sprawdzanie czy słowo jest w liście i czy wygrana */
function handleMouseUp() {
    isMouseDown = false;
    const selectedWord = selectedCells.map(cell => cell.textContent).join("");
    const reversedWord = selectedCells.map(cell => cell.textContent).reverse().join("");

    if (words.includes(selectedWord) || words.includes(reversedWord)) {
        selectedCells.forEach(cell => {
            cell.classList.add("correct-animation");
            setTimeout(() => cell.classList.remove("correct-animation"), 800);
            cell.classList.add("correct");
        });

        foundWords.add(selectedWord);
        updateWordList();
    } else {
        selectedCells.forEach(cell => {
            cell.classList.add("incorrect");
            setTimeout(() => cell.classList.remove("incorrect"), 500);
        });
    }

    selectedCells.forEach(cell => cell.classList.remove("highlight"));
    selectedCells = [];
    startCell = null;
    direction = null;

    if (foundWords.size === words.length) {
        foundWords = new Set();
        setTimeout(showPopup, 100); // Wyświetlamy popup po wygranej
    }
}

function updateWordList() {
    const wordItems = document.querySelectorAll(".word-item");
    wordItems.forEach(item => {
        if (foundWords.has(item.textContent)) {
            item.style.color = "green";
        }
    });
}

/* Pokazywanie listy słów na planszy */
document.getElementById("hint-button").addEventListener("click", () => {
    const wordList = document.getElementById("word-list");
    wordList.classList.toggle("hidden");

    var elem = document.getElementById("hint-button");
    if (elem.textContent.valueOf() === "Pokaż podpowiedź") elem.textContent = "Schowaj podpowiedź";
    else elem.textContent = "Pokaż podpowiedź";
});

// Funkcja do wyświetlenia okienka z gratulacjami
function showPopup() {
    const popup = document.getElementById("win-popup");
    popup.classList.remove("hidden");
}

// Funkcja zamykająca to okienko
function closePopup() {
    const popup = document.getElementById("win-popup");
    popup.classList.add("hidden");
}

// Dodawanie listenerów
const table = document.getElementById('crossword');
table.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "TD") handleMouseDown(event);
});
table.addEventListener("mouseover", (event) => {
    if (event.target.tagName === "TD") handleMouseEnter(event);
});
document.addEventListener("mouseup", handleMouseUp);

loadWords(); // Wczytanie słów i uruchomienie gry
