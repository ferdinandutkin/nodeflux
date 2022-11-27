import {Box, Button, CardActions, TextField} from "@mui/material";
import {SubmitHandler, useForm,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {KeyInput, keySchema, useAddFormContext} from "../state/context";



export const KeyStep = () =>  {
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<KeyInput>({
        resolver: zodResolver(keySchema),
    });

    const {key, setKey, nextStep, prevStep} = useAddFormContext()!


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<KeyInput> = (values) => {
        setKey(values.key)
        nextStep()
    };


    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            id="childForm"
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <TextField
                sx={{ mb: 2 }}
                label='Key'
                fullWidth
                required
                defaultValue={key}
                error={!!(errors.key)}
                helperText={errors.key?.message ?? ''}
                {...register('key')}
            />

        </Box>
    )
}