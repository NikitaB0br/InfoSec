import React, { useState } from 'react';
import './App.scss';

const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

const App: React.FC = () => {
    const [text, setText] = useState('');
    const [key, setKey] = useState<number>(1);
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

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

    const bruteForceDecrypt = (text: string) => {
        let results = [];
        for (let i = 1; i <= 32; i++) {
            results.push(decrypt(text, i));
        }
        setDecryptedText(results.join('\n'));
    };

    const handleEncrypt = () => {
        setEncryptedText(encrypt(text, key));
    };

    const handleDecrypt = () => {
        setDecryptedText(decrypt(encryptedText, key));
    };

    return (
        <div className="caesar-cipher">
            <h1>Шифрование Цезаря</h1>
            <textarea
                className="input-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст"
            />
            <input
                className="input-key"
                type="number"
                value={key}
                onChange={(e) => setKey(Math.max(1, Math.min(32, Number(e.target.value))))}
                min="1"
                max="32"
                placeholder="Введите ключ (1-32)"
            />
            <div className="button-group">
                <button onClick={handleEncrypt}>Зашифровать</button>
                <button onClick={handleDecrypt}>Расшифровать</button>
                <button onClick={() => bruteForceDecrypt(encryptedText)}>Перебор расшифровки</button>
            </div>
            <h2>Зашифрованный текст</h2>
            <pre className="output-text">{encryptedText}</pre>
            <h2>Расшифрованный текст</h2>
            <pre className="output-text">{decryptedText}</pre>
        </div>
    );
};

export default App;