import {ChangeEvent, useState} from "react";

type EditableSpanProps = {
oldTitle: string;
updateTitle: (updatedTitle: string) => void;
disabled?: boolean
};
export const EditableSpan = ({oldTitle,updateTitle,disabled}: EditableSpanProps) => {

    const [editMode, setEditMode] = useState(false);

    const [updatedTitle, setUpdatedTitle] = useState<string>(oldTitle);

    const editModeHandler = () => {
        disabled ? setEditMode(false) : setEditMode(!editMode);
        if (editMode) updateTitle(updatedTitle)
    }

    const updatedTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(event.currentTarget.value);
    }



    return (
        editMode ?
            <input
                className={'input'}
                autoFocus
                onBlur={editModeHandler}
                value={updatedTitle}
                onChange={updatedTitleHandler}
            />
            :
            <span onDoubleClick={editModeHandler} >{oldTitle}</span>
    );
};