
import {AddFormContext, AddBotState, useAddFormContext} from "./state/context";
import {CSSProperties, useState} from "react";
import {CurrentStep} from "./steps/CurrentStep";
import {Button, Card, CardActions, CardContent, CardHeader, Stepper} from "@mui/material";
import MobileStepper from '@mui/material/MobileStepper';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";


const NextButton = () => {
    const {step} = useAddFormContext()!;
    return (<Button
        fullWidth
        variant="contained"
        form="childForm"
        type='submit'
    >
        Next
    </Button>)
}

const PrevButton = () => {
    const {prevStep} = useAddFormContext()!
    return (<Button
        fullWidth
        variant="outlined"
        onClick={prevStep}
    >
        Back
    </Button>)
}


export const AddBot = ({style} : {style : CSSProperties}) => {

    const [key, setKey] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [step, setStep] = useState<number>(0)

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    const reset = () => {
        setKey('')
        setName('')
        setStep(0)
    }

    const initialState : AddBotState = {
        key, setKey, name, setName, step, nextStep, prevStep, setStep, reset
    }

    return (
        <Card style={style}>
            <CardHeader title="New bot"/>
            <CardContent>

                        <AddFormContext.Provider value={initialState}>
                            <CurrentStep/>
                            <CardActions>
                                {
                                    (step === 1)? <PrevButton/> : null
                                }
                                <NextButton/>
                            </CardActions>
                        </AddFormContext.Provider>
                            <MobileStepper
                                variant="dots"
                                steps={3}
                                position="static"
                                activeStep={step}
                                backButton={''}
                                nextButton={''}/>


            </CardContent>
        </Card>

    )
}