import {useEffect, useState} from 'react';
import {Position} from "../models/nodes/typings/INode";
const useWindowScroll = () => {
    const [windowScroll, setWindowScroll] = useState<Position>({x : 0, y : 0});

    useEffect(() => {
        const updateWindowScroll = (e : Event) => {
            setWindowScroll({ x: window.scrollX, y: window.scrollY });
        };
        window.addEventListener('scroll', updateWindowScroll);

        return () => {
            window.removeEventListener('scroll', updateWindowScroll);
        };
    }, []);
    return windowScroll;
};
export default useWindowScroll;