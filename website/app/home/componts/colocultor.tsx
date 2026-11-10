"use client"

import { FC, useState } from "react";
import style from "../style/colocultor.module.css";

const Calcultor: FC = () => {
    const [display, setDisplay] = useState("0");
    const [firstNumber, setFirstNumber] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);

    const handleNumber = (number: string) => {
        setDisplay(display === "0" ? number : display + number);
    };

    const handleDecimal = () => {
        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const handleOperator = (op: string) => {
        setFirstNumber(Number(display));
        setOperator(op);
        setDisplay("0");
    };

    const calculate = () => {
        if (firstNumber === null || operator === null) return;

        const secondNumber = Number(display);
        let result = 0;

        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;

            case "-":
                result = firstNumber - secondNumber;
                break;

            case "*":
                result = firstNumber * secondNumber;
                break;

            case "/":
                if (secondNumber === 0) {
                    setDisplay("Error");
                    setFirstNumber(null);
                    setOperator(null);
                    return;
                }

                result = firstNumber / secondNumber;
                break;
        }

        setDisplay(String(result));
        setFirstNumber(null);
        setOperator(null);
    };

    const clear = () => {
        setDisplay("0");
        setFirstNumber(null);
        setOperator(null);
    };

    const handleBackspace = () => {
        if (display === "Error" || display.length <= 1) {
            setDisplay("0");
            return;
        }

        setDisplay(display.slice(0, -1));
    };

    return (
        <div className={style.continer}>

            <div className={style.text}>
                <span>Calculator</span>
            </div>

            <div className={style.calculator}>

                <div className={style.display}>
                    {display}
                </div>

                <div className={style.buttons}>

                    {/* C - մեծ կոճակ */}
                    <button
                        onClick={clear}
                        className={style.clear}
                    >
                        C
                    </button>

                    <button
                        onClick={handleBackspace}
                        className={style.backspace}
                    >
                        ⌫
                    </button>

                    <button
                        onClick={() => handleOperator("/")}
                        className={style.operator}
                    >
                        ÷
                    </button>


                    {/* 7 8 9 × */}
                    <button onClick={() => handleNumber("7")}>
                        7
                    </button>

                    <button onClick={() => handleNumber("8")}>
                        8
                    </button>

                    <button onClick={() => handleNumber("9")}>
                        9
                    </button>

                    <button
                        onClick={() => handleOperator("*")}
                        className={style.operator}
                    >
                        ×
                    </button>


                    {/* 4 5 6 - */}
                    <button onClick={() => handleNumber("4")}>
                        4
                    </button>

                    <button onClick={() => handleNumber("5")}>
                        5
                    </button>

                    <button onClick={() => handleNumber("6")}>
                        6
                    </button>

                    <button
                        onClick={() => handleOperator("-")}
                        className={style.operator}
                    >
                        −
                    </button>


                    {/* 1 2 3 + */}
                    <button onClick={() => handleNumber("1")}>
                        1
                    </button>

                    <button onClick={() => handleNumber("2")}>
                        2
                    </button>

                    <button onClick={() => handleNumber("3")}>
                        3
                    </button>

                    <button
                        onClick={() => handleOperator("+")}
                        className={style.operator}
                    >
                        +
                    </button>


                    {/* 0 . = */}
                    <button
                        onClick={() => handleNumber("0")}
                        className={style.zero}
                    >
                        0
                    </button>

                    <button onClick={handleDecimal}>
                        .
                    </button>

                    <button
                        onClick={calculate}
                        className={style.equal}
                    >
                        =
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Calcultor;