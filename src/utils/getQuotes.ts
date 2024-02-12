import { useCallback, useState, useEffect } from "react";
const getQuote = (limit: number) => {
    let words;
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`https://api.quotable.io/random?minLength=${limit}`);
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const result = await response.json();
                console.log(result)
                words = result.content
            } catch (error) {
                console.error('Error al obtener las palabras:', error);
            }
        };

        fetchWords();
    }, []);
    return words;
}

export default getQuote;