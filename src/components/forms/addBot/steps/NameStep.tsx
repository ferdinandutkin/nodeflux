import {Box, TextField} from "@mui/material";
import {ChangeHandler, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {NameInput, nameSchema, useAddFormContext} from "../state/context";
import {getDefaultBotName} from "../../../../api/requests";


export const NameStep = () =>  {
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<NameInput>({
        resolver: zodResolver(nameSchema),
    });


    const {name, setName, nextStep, key} = useAddFormContext()!

    useEffect(() => {
        getDefaultBotName(key).then(response => {
                setName(response.data)
        }
        )
    }, [key])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<NameInput> = (values) => {
        nextStep()
    };

    let otherProps = {...register('name')}

    const oldChange = otherProps.onChange

    otherProps.onChange = (e) => {
        setName(e.target.value)
        return oldChange(e)
    }

    return (
        <Box
            component='form'
            noValidate
            id="childForm"
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitHandler)}
        >
                    <TextField
                        sx={{ mb: 2 }}
                        label='Name'
                        fullWidth
                        required
                        value={name}
                        error={!!(errors.name)}
                        helperText={errors.name?.message ?? ''}
                        {...otherProps}
                    />

        </Box>
    )
}
