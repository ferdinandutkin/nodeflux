
import {createContext, useContext} from "react";
import {object, string, TypeOf} from "zod";
import {WithSetters} from "../../../../helpers/typeSystem";



export const nameSchema = object({
    name: string()
        .min(1,'Name is required')
        .max(32, 'Name must be less than 32 characters')

})

export const keySchema = object({
    key: string()
        .min(1,'Key is required')
        .min(46, 'Key should be 46 characters length')
        .max(46, 'Key should be 46 characters length'),
})

export const addBotSchema = nameSchema.merge(keySchema)

export type NameInput = TypeOf<typeof nameSchema>

export type KeyInput = TypeOf<typeof keySchema>

export type AddBotInput = TypeOf<typeof addBotSchema>

export type WithSteps<T> = T & WithSetters<{step : number}> & {step : number, nextStep : () => void, prevStep: () => void }

export type AddBotState = WithSteps<WithSetters<AddBotInput>> & {reset : () => void}

export const AddFormContext = createContext<AddBotState | undefined>(undefined);

export const useAddFormContext = () => useContext(AddFormContext);

