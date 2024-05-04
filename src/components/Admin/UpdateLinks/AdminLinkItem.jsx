import "./styles/AdminLinkItem.css";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Button, IconButton, Tooltip, Paper } from "@mui/material";
import { ExpandMore, Edit } from "@mui/icons-material";

import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';

const buttonSX = {
    textTransform:'unset'
}

export default function LinkItem({title, link, onUpdate, onDelete}) {

    

    return (
        <Accordion
            sx={{margin:'20px 0'}}
            component={Paper}
            elevation={2}
        >
            <AccordionSummary
                expandIcon={<ExpandMore sx={{fontSize:'30px'}} />}

            >
                <p className="text li-summary">{title}</p>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction={'row'}
                    gap={2}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    flexWrap={'wrap'}

                >
                    <LinkIcon/>
                    <p className="text li-details">{link}</p>
                    <Tooltip title="Visit Link">
                        <IconButton onClick={()=> window.open(link)}>
                            <LaunchIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack
                    direction={'row'}
                    gap={2}
                    justifyContent={'flex-end'}
                    flexWrap={'wrap'}
                >
                   <Tooltip title={"Edit Link"}>
                    <IconButton onClick={()=> onUpdate({title, link})}>
                        <Edit/>
                    </IconButton>
                   </Tooltip>
                    <Tooltip title={"Delete Link"}>
                        <IconButton onClick={()=> onDelete({title})}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}