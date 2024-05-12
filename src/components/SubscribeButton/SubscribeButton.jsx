import { EmailOutlined } from "@mui/icons-material";
import { Box, Fab, Tooltip } from "@mui/material";




export default function SubscribeButton({handleClick}) {
    return (
        <Box
            position={'fixed'}
            bottom={'30px'}
            right={'30px'}
            zIndex={2}

        >
            <Tooltip
                title="Subscribe!"
                placement="left"
            >
                <Fab
                    onClick={handleClick}
                >
                    <EmailOutlined/>
                </Fab>
            </Tooltip>
        </Box>
    )
}