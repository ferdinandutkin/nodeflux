import {useEffect, useState} from 'react';
import {Position} from "../models/INode";
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<Position>();

    useEffect(() => {
        const updateMousePosition = (e : MouseEvent) => {
            setMousePosition({ X: e.clientX, Y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
export default useMousePosition;