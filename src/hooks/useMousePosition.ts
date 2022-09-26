import {useEffect, useState} from 'react';
import {Position} from "../models/nodes/INode";
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<Position>();

    useEffect(() => {
        const updateMousePosition = (e : MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
export default useMousePosition;