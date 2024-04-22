import { Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
    Button
} from "@mui/material";

import { Delete } from "@mui/icons-material";



export default function ConfirmDelete({open, onDelete}) {


    return (
        <Dialog
            open={open}
            onClose={()=> onDelete(false)}
        >
            <DialogTitle>
                Delete This Link?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>This action cannot be undone.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    size="small"
                    color='error'
                    endIcon={<Delete/>}
                    onClick={()=> onDelete(true)}
                >
                    Delete
                </Button>
                <Button
                    onClick={()=> onDelete(false)}
                    size="small"
                    color="primary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}