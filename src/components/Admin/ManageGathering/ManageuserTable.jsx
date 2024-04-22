import { Table, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    TableBody,
    TableFooter,
    TablePagination,
    Skeleton,
    Stack,
    useMediaQuery,
    Select,
    MenuItem,
    IconButton,
    Tooltip,
    FormControlLabel

} from "@mui/material";
import {styled} from '@mui/material/styles'
import { useEffect, useState } from "react";

import { UnfoldLess, UnfoldMore } from "@mui/icons-material";



const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const TABLE_HEADER_CELLS = [
    "Email",
    "First Name",
    "Last Name",
    "Date Joined"
];



export default function ManageUserTable() {

    const [tableRows, setTableRows] = useState([]);
    const [currentTablePage, setCurrentTablePage] = useState(0);

    const [loadingRows, setLoadingRows] = useState(true);

    const smallScreen = useMediaQuery('(max-width: 800px');


    //event_goers | all_subscribers
    const [subscriptionFilter, setSubscriptionFilter] = useState('event_goers');
    const [collapse, setCollapse] = useState(false);


    
    function handlePageChange(e, newPage) {
        setCurrentTablePage(newPage);
    }

    useEffect(()=> {
        //Make api call for getting users attending
        generateDummyData();
    },[]);



    /**
     * @description handle any filter changes that occur
     */
    useEffect(()=> {

        /**
         * @description - Get a list of all subscribers that are subscribed to the website.
         */
        async function fetchAllSubscribers() {
            console.log('fetching all subscribers')
        }


        /**
         * @description - get a list of all users who are currently going to the scheduled event.
         */
        async function fetchEventGoers() {
            console.log('fetching all event goers');
        }


        if(subscriptionFilter === 'event_goers') {
            fetchEventGoers();
        } else {
            fetchAllSubscribers();
        }
    },[subscriptionFilter]);



    function generateDummyData() {
        const updatedRows = [];
        for(let i = 0; i< 5; i++) {
            updatedRows.push({
                email:'will.m.pattison-'+(i+1)+'@gmail.com',
                firstName:`William-${i+1}`,
                lastName:`Pattison-${i+1}`,
                dateJoined: new Date().toLocaleDateString()
            });
        }
        setTableRows(updatedRows);
        setTimeout(()=> {
            setLoadingRows(false);
        },2000);
    }

    return (
        <Box mt={5}>
            <Paper sx={{padding: smallScreen ? '0': '10px'}}>
                <Stack
                    p={2}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                >
                    <Typography fontSize={'30px'}>Event Attendees</Typography>
                    <Stack
                        direction={'row'}
                        gap={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexWrap={'wrap'}
                    >
                        {
                            collapse === false ? (
                                <Tooltip title="Collapse Table">
                                    <IconButton onClick={()=> setCollapse(true)}>
                                        <UnfoldLess/>
                                    </IconButton>
                                </Tooltip>
                            ): (
                                <Tooltip title="Expand Table">
                                    <IconButton onClick={()=> setCollapse(false)}>
                                        <UnfoldMore/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        <FormControlLabel
                            label="Filter Subscribers"
                            labelPlacement='top'
                            control={
                                <Select
                                    size="small"
                                    value={subscriptionFilter}
                                    onChange={(e)=> setSubscriptionFilter(e.target.value)}
                                >
                                    <MenuItem value={'all_subscribers'}>All Subscribers</MenuItem>
                                    <MenuItem value={'event_goers'}>Event Goers</MenuItem>
                                </Select>
                            }

                        />
                    </Stack>

                </Stack>
                <TableContainer  component={Paper}>
                    <Table size={collapse ? 'small':'large'}>
                        <TableHead>
                            <TableRow>
                                {
                                    TABLE_HEADER_CELLS.map(cell => {
                                        return (
                                            <TableCell key={cell}>
                                                <Typography fontWeight={600} fontSize={'16px'}>
                                                    {cell}&nbsp;
                                                </Typography>
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loadingRows === true ? (
                                    [...Array(5)].map((_, i)=>  {
                                        return (
                                            <StyledTableRow key={i}>
                                                {
                                                    [...Array(4)].map((_,j)=> {
                                                        return (
                                                            <TableCell key={i+"," +j}>
                                                                <Box sx={{height:'max-content'}}>
                                                                    <Skeleton variant='rectangular'/>
                                                                </Box>
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </StyledTableRow>
                                        )
                                    })
                                ):(
                                    tableRows.map((row, i)=> {
                                        return (
                                            <StyledTableRow key={row.email}>
                                                {
                                                    Object.keys(row).map(key => {
                                                        return (
                                                            <TableCell key={row.email+row[key]+i}>
                                                                {row[key]}
                                                            </TableCell>
                                                        );
                                                    })
                                                }
                                            </StyledTableRow>
                                        );
                                    })
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component={'div'}
                    count={tableRows.length}
                    page={currentTablePage}
                    rowsPerPageOptions={[5]}
                    rowsPerPage={5}
                    onPageChange={handlePageChange}
                />
            </Paper>
        </Box>
    )
}