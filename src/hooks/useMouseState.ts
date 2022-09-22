import {useEffect, useState} from "react";

export type ButtonState = "pressed" | "released"

const useLeftClickState = () => {
    const [leftClickState, setLeftClickState] = useState<ButtonState>()

    useEffect(() => {
        const setReleased = () => setLeftClickState("released")

        const setPressed = () => setLeftClickState("pressed")

        window.addEventListener('mousedown', setPressed)
        window.addEventListener('mouseup', setReleased)
        return () => {
            window.removeEventListener('mousedown', setPressed)
            window.removeEventListener('mouseup', setReleased)
        }
    }, [])
    return leftClickState
};
export default useLeftClickState