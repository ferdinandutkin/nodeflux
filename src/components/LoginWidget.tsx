import { Box } from "@mui/material";
import {SyntheticEvent, useEffect, useRef} from "react";


export const LoginWidget = () =>
{
    const div = useRef<HTMLDivElement>(null)

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?" + 21
    script.setAttribute("data-telegram-login", 'nodegramauth_bot');
    script.setAttribute("data-size", 'large');
    script.setAttribute('data-auth-url', 'api/user/tglogin')
    script.async = true;

    useEffect(() =>{

        div.current?.appendChild(script)

    }, [div])




    return <div ref={div}>
    </div>
}



