
import "./styles/PageTitle.css"
import { Tooltip, IconButton, Stack, Box, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
/**
 * @description Component for creating page title for the top of each page.
 * @param {*} param0 
 */
export default function PageTitle({title, showNavigation=true}) {

    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    console.log(isSmallScreen)

    return (
        <Stack
            direction={'row'}
            gap={3}
            alignItems={'center'}
            justifyContent={'center'}

        >   
            <Box position={'relative'}>
                {
                    isSmallScreen===false && showNavigation && (
                        <Box
                            position={'absolute'}
                            left={'-60px'}
                            top={'10px'}
                        >
                            <Tooltip title="Go Back">
                                <IconButton onClick={()=> navigate('/')}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )
                }
                <h1 className="text _pagetitle">{title}</h1>
            </Box>
        </Stack>
    )
}