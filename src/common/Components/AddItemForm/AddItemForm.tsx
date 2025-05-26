import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Box, IconButton, TextField, useTheme} from "@mui/material";
import {Add } from '@mui/icons-material';


type Props = {
    addItem: (title: string) => void;
    disabled?: boolean;
};
export const AddItemForm = ({addItem,disabled}: Props) => {

    const theme = useTheme()

    const [error, setError] = useState<string | null>(null)
    const [itemTitle, setItemTitle] = useState<string>('');

    const addItemHandler = () => {
        if (itemTitle.trim()) {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setItemTitle(event.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItemHandler()
    }



    return (
        <Box sx={{bgColor:`${theme.palette.primary.main}`}}>
                <TextField id="outlined-basic"
                           error={!!error}
                           label={error ? error : 'Enter title'}
                           variant="outlined"
                           color={'error'}
                           value={itemTitle}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyDownHandler}
                           size={'small'}
                           sx={{'&:active': {bgColor:`${theme.palette.secondary.light}`}}}
                           disabled={disabled}
                />
                <IconButton aria-label="add" onClick={addItemHandler} disabled={disabled}>
                    <Add />
                </IconButton>
        </Box>

    );
};