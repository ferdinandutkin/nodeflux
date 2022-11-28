

import {password} from "../login/LoginSchema";
import {object, string, TypeOf} from "zod";



export const changePasswordSchema = object({
    password,
    newPassword: password
})


export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;


