import React, { useState } from 'react';
import './App.scss';

// Алфавит, используемый для шифрования и расшифрования сообщения
const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

const App: React.FC = () => {
    // Хуки для хранения текста, значения ключа шифрования, зашифрованного и расшифрованного сообщения
    const [text, setText] = useState('');
    const [key, setKey] = useState<number>(1);
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    // Функция для шифрования текста методом Цезаря
    const encrypt = (text: string, key: number): string => {
        return text.split('').map(char => {
            const index = alphabet.indexOf(char.toUpperCase());
            if (index !== -1) {
                const newIndex = (index + key) % alphabet.length;
                return alphabet[newIndex];
            }
            return char;
        }).join('');
    };

    // Функция для расшифрования текста методом Цезаря
    const decrypt = (text: string, key: number): string => {
        return text.split('').map(char => {
            const index = alphabet.indexOf(char.toUpperCase());
            if (index !== -1) {
                const newIndex = (index - key + alphabet.length) % alphabet.length;
                return alphabet[newIndex];
            }
            return char;
        }).join('');
    };

    // Функция для расшифровки методом полного перебора всех ключей от 1 до 32
    const bruteForceDecrypt = (text: string) => {
        let results = [];
        for (let i = 1; i <= 32; i++) {
            results.push(decrypt(text, i));
        }
        setDecryptedText(results.join('\n'));
    };

    // Обработчик для запуска функции шифрования и сохранения результата в состоянии
    const handleEncrypt = () => {
        setEncryptedText(encrypt(text, key));
    };

    // Обработчик для запуска функции расшифрования и сохранения результата в состоянии
    const handleDecrypt = () => {
        setDecryptedText(decrypt(encryptedText, key));
    };

    return (
        <div className="appWrapper">
            <div className="mainContainer">
                <h1>Шифр Цезаря</h1>
                <textarea
                    className="inputText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите текст"
                />
                <input
                    className="inputKey"
                    type="number"
                    value={key}
                    onChange={(e) => setKey(Math.max(1, Math.min(32, Number(e.target.value))))}
                    min="1"
                    max="32"
                    placeholder="Введите ключ (1-32)"
                />
                <div className="buttons">
                    <button onClick={handleEncrypt}>Зашифровать</button>
                    <button onClick={handleDecrypt}>Расшифровать</button>
                    <button onClick={() => bruteForceDecrypt(encryptedText)}>Перебор расшифровки</button>
                </div>
                <h2>Зашифрованный текст</h2>
                <pre className="outputText">{encryptedText}</pre>
                <h2>Расшифрованный текст</h2>
                <pre className="outputText">{decryptedText}</pre>
            </div>
        </div>
    );
};

export default App;