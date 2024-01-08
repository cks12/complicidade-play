"use client";

import { Container } from "postcss";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import TinderCard, { } from "react-tinder-card";

interface item {
    name: string;
    id: string;
}

interface GameClientProps {
    items: item[];
}

const GameClient: React.FC<GameClientProps> = ({ items }) => {
    const [status, setStatus] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [helperText, setHelperText] = useState("Hora de pensar");
    const [index, setIndex] = useState(0);
    // const TinderRef = useRef<TinderCard>();

    useEffect(() => {
        const timer = setInterval(() => {
            switch (status) {
                case 0:
                    setHelperText("Hora de pensar")
                    if (seconds <= 0) {
                        setStatus(1);
                        setSeconds(120);
                        break;
                    }
                    break;
                case 1:
                    setHelperText("Hora do jogador 1 falar");
                    if (seconds <= 0) {
                        setSeconds(120);
                        setStatus(2);
                    }

                    break;

                case 2:
                    setHelperText("Hora do jogador 2 falar");
                    if (seconds <= 0) {
                        setStatus(3);
                    }

                    break;
                case 3:
                    if (items.length - 1 == index) { 
                        // alert("Fim do jogo")
                        return () => {}
                    };
                    setIndex(e => e + 1);
                    setStatus(0);
                    setSeconds(30);
                    break;

                default:
                    break;
            }
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [index, items.length, seconds]);

    const swipe = useCallback((index: number, r: any) => {
        if (status == 3)
            r?.swipe("left")
    }, [status])

    return <>
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <div className="-top-[200px] left-2  flex flex-col items-center text-white relative">
                <span>
                    {seconds} seg
                </span>
                <span>{helperText}</span>
            </div>
            {items.map(e => (
                <>
                    <TinderCard
                        key={e.id}
                        ref={r => { (items[index].id == e.id) ? swipe(index, r) : null }}
                        className="w-full absolute max-w-[14rem] px-2 text-center h-full max-h-[20rem] flex text-white items-center justify-center bg-red-500 rounded-md"
                        preventSwipe={['right', 'left', "up", "down"]}>
                        <div className="first-letter:capitalize ">{e.name}</div>
                    </TinderCard>
                </>
            ))}

        </div>
    </>
}


const GameClienteMemo = memo(GameClient)

export default GameClienteMemo;