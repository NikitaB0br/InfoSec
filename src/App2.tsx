import React, { useState } from 'react';
import './App2.scss';

// Функция для получения числового кода символа из русского алфавита
const getCharCode = (char: string): number => {
    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    return alphabet.indexOf(char.toUpperCase()) + 1;
};

// Функция для получения символа из числового кода
const getCharFromCode = (code: number): string => {
    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    return alphabet[code - 1] || '?';
};

// Функция для нахождения наибольшего общего делителя (НОД) двух чисел
const gcd = (a: bigint, b: bigint): bigint => {
    return b === BigInt(0) ? a : gcd(b, a % b);
};

// Функция для нахождения обратного по модулю числа a по модулю m
const modInverse = (a: bigint, m: bigint): bigint => {
    let m0 = m;
    let y = BigInt(0), x = BigInt(1);

    if (m === BigInt(1)) return BigInt(0);

    // Основной алгоритм Евклида для нахождения обратного
    while (a > BigInt(1)) {
        let q = a / m;
        let t = m;

        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < BigInt(0)) x += m0;

    return x;
};

const App2: React.FC = () => {
    // Определение простых чисел и хуков для открытого ключа, закрытого ключа, сообщения для шифрования, зашифрованного сообщения и расшифрованного сообщения
    const [p] = useState<bigint>(BigInt(101));
    const [q] = useState<bigint>(BigInt(103));
    const [publicKey, setPublicKey] = useState<{ e: bigint; n: bigint } | null>(null);
    const [privateKey, setPrivateKey] = useState<{ d: bigint; n: bigint } | null>(null);
    const [message, setMessage] = useState<string>('');
    const [encryptedMessage, setEncryptedMessage] = useState<string>('');
    const [decryptedMessage, setDecryptedMessage] = useState<string>('');

    // Функция для генерации ключей
    const generateKeys = () => {
        const n = p * q;
        const phi = (p - BigInt(1)) * (q - BigInt(1));

        let e = BigInt(2);
        while (e < phi && gcd(e, phi) !== BigInt(1)) {
            e += BigInt(1);
        }

        const d = modInverse(e, phi);
        setPublicKey({ e, n });
        setPrivateKey({ d, n });
    };

    // Функция для шифрования сообщения
    const encryptMessage = () => {
        if (!publicKey) return;

        const encrypted = message
            .split('')
            .map((char) => (BigInt(getCharCode(char)) ** publicKey.e) % publicKey.n)
            .join(' ');
        setEncryptedMessage(encrypted);
    };

    // Функция для расшифрования сообщения
    const decryptMessage = () => {
        if (!privateKey) return;

        const decrypted = encryptedMessage
            .split(' ')
            .map((num) => getCharFromCode(Number((BigInt(num) ** privateKey.d) % privateKey.n)))
            .join('');
        setDecryptedMessage(decrypted);
    };

    return (
        <div className="appWrapper">
            <div className="app">
                <h1>RSA Шифрование и Дешифрование</h1>

                <div className="keys">
                    <button onClick={generateKeys}>Сгенерировать ключи</button>
                    {publicKey && privateKey && (
                        <div>
                            <p>Открытый ключ (e, n): ({publicKey.e.toString()}, {publicKey.n.toString()})</p>
                            <p>Закрытый ключ (d, n): ({privateKey.d.toString()}, {privateKey.n.toString()})</p>
                        </div>
                    )}
                </div>
                <div className="encryption">
                    <h2>Шифрование</h2>
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={encryptMessage}>Зашифровать</button>
                    <p>Зашифрованное сообщение: {encryptedMessage}</p>
                </div>

                <div className="decryption">
                    <h2>Дешифрование</h2>
                    <button onClick={decryptMessage}>Расшифровать</button>
                    <p>Расшифрованное сообщение: {decryptedMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default App2;