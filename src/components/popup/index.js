import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ConfirmDialog({open, title, message, onConfirm, onCancel}) {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            {/* Title with Close button */}
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e0e0e0",
                }}
            >
                {title}
                <IconButton aria-label="close" onClick={onCancel}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            {/* Content (no border) */}
            <DialogContent sx={{p: 2, marginTop: '1.2em', color: 'rgb(48, 62, 68)', fontSize: '14px', fontWeight: '500'}}>
                <Typography>{message}</Typography>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{p: 2}}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    sx={{
                        textTransform: "none", fontWeight: "600",
                        fontSize: "18px",
                        width: '6em',
                        color: 'rgb(84, 93, 105)',
                        background: 'rgb(255, 255, 255)'
                    }}
                >
                    cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        backgroundColor: "rgb(44, 166, 0)",
                        textTransform: "none",
                        fontWeight: "600",
                        fontSize: "18px",
                        width: '6em'
                    }}
                >
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
