import {  useState, useEffect } from "react";
const getQuote = (limit: number) => {
    const [words, setWords] = useState<string>("");
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`https://api.quotable.io/quotes/?minLength=${limit}`);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const result = await response.json();
                setWords(result.results[0].content);
            } catch (error) {
                console.error('Error al obtener las palabras:', error);
            }
        };

        fetchWords();
    }, []);
    return words;
}

export default getQuote;