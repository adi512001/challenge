import React, { useState, useEffect, useRef } from 'react';
import { Button, DialogTitle, DialogContent, DialogActions, Avatar, Chip, Zoom, TextField } from '@material-ui/core';
import { ModalDialog, CustomForm, SubmitButton, AddUserButton } from '../CustomComponents';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
    selectedOptions: ({ name: string; })[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<({
        name: string;
    })[]>>;
    isOpen: boolean;
    handleClose: () => void;
    users: ({ name: string; })[];
    setUsers: React.Dispatch<React.SetStateAction<{
        name: string;
    }[]>>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "transparent",
            "& .MuiAutocomplete-endAdornment": {
                top: "6%"
            },
        },
        inputRoot: {
            "& .MuiOutlinedInput-notchedOutline": {
                maxHeight: '70px'
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6519b5",
                maxHeight: '130px',
                overflowY: "scroll"
            }
        }
    }),
);

const ModalForm: React.FC<Props> = (props) => {
    const { selectedOptions, setSelectedOptions, isOpen, handleClose, users, setUsers } = props;

    const [text, setText] = useState('');
    const [width, setWidth] = useState(0);
    const [limit, setLimit] = useState(10);
    const [textFieldWidth, setTextFieldWidth] = useState(0);
    const [count, setCount] = useState(1);

    const ref = useRef<HTMLInputElement | null>(null);

    const classes = useStyles();

    const history = useHistory();

    const handleTextChange = (event: React.ChangeEvent<{}>, value: string) => {
        setText(value);
    }

    const handleAddOption = () => {
        setUsers([...users, { name: text }]);
        setSelectedOptions([...selectedOptions, { name: text }]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddOption();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        localStorage.setItem('userSubscribed', 'true');
        history.push('/');
    }

    const handleChange = (event: React.ChangeEvent<{}>, values: (string | { name: string; })[]) => {
        let difference = selectedOptions?.filter(opt => !values.includes(opt));
        const newValues: ({ name: string; })[] = [];
        let newName = '';
        values.forEach(value => {
            if (typeof value === 'string') {
                newValues.push({ name: value });
                newName = value;
            }
            else if (value.name) {
                newValues.push(value);
                newName = value.name;
            }
            var text = document.createElement("span");
            document.body.appendChild(text);
            text.style.font = "Roboto, Helvetica, Arial, sans-serif";
            // chip font size - 13px
            text.style.fontSize = 13 + "px";
            text.style.height = 'auto';
            text.style.width = 'auto';
            text.style.position = 'absolute';
            text.style.whiteSpace = 'no-wrap';
            text.innerHTML = newName;
            let widthToAdd = Math.ceil(text.clientWidth);
            document.body.removeChild(text);
            // avatar width - 24px
            // delete button width - 22 px
            // padding left and right - 24 px
            // all together - 70 px
            setWidth(width + 70 + widthToAdd);
        });
        const isInArray = users.find(option => option.name === newName);
        if (isInArray !== undefined && newName !== '') {
            if (difference?.length !== 1) {
                setUsers([...users, { name: newName }]);
            }
            else {
                setUsers(prevState => prevState.filter((option, index) => index !== prevState.length - 1))
            }
        }
        if (difference && difference.length === 1) {
            setCount(count - 1);
            var text = document.createElement("span");
            document.body.appendChild(text);
            text.style.font = "Roboto, Helvetica, Arial, sans-serif";
            // chip font size - 13px
            text.style.fontSize = 13 + "px";
            text.style.height = 'auto';
            text.style.width = 'auto';
            text.style.position = 'absolute';
            text.style.whiteSpace = 'no-wrap';
            text.innerHTML = difference[0].name;
            let deletedWidth = Math.ceil(text.clientWidth);
            document.body.removeChild(text);
            const widthToDelete = deletedWidth + 70;
            setWidth(width - widthToDelete);

        }
        setSelectedOptions(newValues);
    };

    useEffect(() => {
        // textfield inner padding:
        // left : 9px
        // right: 65px
        // together: 74px
        if (textFieldWidth > 0 && width > textFieldWidth - 74) {
            setLimit(selectedOptions?.length - count);
            setCount(count + 1);
            // if (difference === undefined) {
            //     setCount(count + 1);
            // }
            // else {
            //     setCount(count - 1);
            // }
        }
    }, [width, textFieldWidth, selectedOptions?.length]);

    useEffect(() => {
        if (ref.current?.clientWidth) {
            setTimeout(() => {
                setTextFieldWidth(ref.current?.clientWidth ? ref.current?.clientWidth : 0)
            }, 1000)
        }
    }, [selectedOptions?.length, textFieldWidth]);

    return (
        <iframe title="subscription modal" src="about:blank">
            <Zoom in={isOpen}>
                <ModalDialog
                    open={isOpen}
                    BackdropProps={{
                        classes: {
                            root: classes.root
                        }
                    }}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogTitle>Subscription</DialogTitle>
                    <DialogContent>
                        <CustomForm
                            onSubmit={handleSubmit}
                        >
                            <Autocomplete
                                id="auto-complete"
                                classes={classes}
                                multiple
                                value={selectedOptions ? selectedOptions : []}
                                onChange={(event, values) => handleChange(event, values)}
                                limitTags={limit}
                                options={users}
                                freeSolo
                                getOptionLabel={(option: { name: string }) => option.name}
                                disableCloseOnSelect
                                onKeyDown={handleKeyDown}
                                onInputChange={handleTextChange}
                                renderTags={(tagValue, getTagProps) => {
                                    return tagValue.map((option, index) => (
                                        <Chip {...getTagProps({ index })} label={option.name}
                                            avatar={<Avatar>{option.name?.charAt(0).toUpperCase()}</Avatar>} />
                                    ));
                                }}
                                getLimitTagsText={(more: number) =>
                                    <Chip label={`${more} more`} />}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        ref={ref}
                                        variant="outlined"
                                        label="Select users"
                                        value={text} />
                                )}
                                forcePopupIcon
                                filterSelectedOptions
                            />
                            {text !== '' && <AddUserButton variant="contained" color="secondary" onClick={handleAddOption}>{`Add ${text} to the users list`}</AddUserButton>}
                            <SubmitButton variant="contained" color="primary" type="submit">Submit</SubmitButton>
                        </CustomForm>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                    </Button>
                    </DialogActions>
                </ModalDialog>
            </Zoom>
        </iframe>
    )
}

export default ModalForm;