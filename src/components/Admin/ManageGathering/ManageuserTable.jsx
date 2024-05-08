import { 
    Table, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    TableBody,
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
import { useCallback, useEffect, useState } from "react";

import { UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { ifawfAdmin } from "../../_global/ifawf-api";



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

const TABLE_BODY_CELLS= [
    'email',
    'firstName',
    'lastName',
    'dateJoined'
]


const LIMIT = 5;



export default function ManageUserTable() {

    const [tableRows, setTableRows] = useState([]);

    const [currentTablePage, setCurrentTablePage] = useState(0);

    // Used for paginating the next request
    const [ExclusiveStartKey, setExclusiveStartKey] = useState(['']);


    const [loadingRows, setLoadingRows] = useState(true);
    const smallScreen = useMediaQuery('(max-width: 800px');


    //event_goers | all_subscribers
    const [subscriptionFilter, setSubscriptionFilter] = useState('event');
    const [collapse, setCollapse] = useState(false);

    const [rowCount, setRowCount] = useState(0);


    // Update the subscribers when page is changed.
    async function handlePageChange(e, newPage) {
        setCurrentTablePage(newPage);
        await fetchSusbcribers();
    }


    /**
     * @description Get the event id for the current event. This is used in the aprams for fetching all users
     * subscribed to this event.
     */
    const populateEventId = useCallback( async ()=> {
        try {
            const gatheringResponse = await ifawfAdmin.get('/gathering');
            const gathering = gatheringResponse.data.data[0];
            return gathering.created;
        } catch(error) {
            return '0';
        }
    },[]);


    const fetchSusbcribers = useCallback( async ()=> {
        try {
            setLoadingRows(true);
            const query =  {
                type: subscriptionFilter,
                limit: LIMIT.toString(),
                ExclusiveStartKey:ExclusiveStartKey[currentTablePage]
            };
            if(subscriptionFilter === 'event') {
                const eventid = await populateEventId();
                query['eventid'] = eventid;
            }
            const subscribersResponse = await ifawfAdmin.get('/subscribers',{params:query});
            const body = subscribersResponse.data;

            // Add pagination to the current request
            if(typeof(body.ExclusiveStartKey) === 'string' && body.ExclusiveStartKey.length != 0) {
                setExclusiveStartKey([...ExclusiveStartKey, body.ExclusiveStartKey])
            } else if(typeof(body.ExclusiveStartKey) === 'object') {
                setExclusiveStartKey([...ExclusiveStartKey, body.ExclusiveStartKey.email +" "+body.ExclusiveStartKey.eventid]);
            }

            //update the ui now
            setTableRows(body.data);
            setRowCount(body.count);

        } catch(error) {
            console.log(error);
        } finally {
            setLoadingRows(false);
        }
    },[]);



    /**
     * @description handle any filter changes that occur
     */
    useEffect(()=> {
        fetchSusbcribers();
    },[subscriptionFilter,fetchSusbcribers]);


    /**
     * @description Make sure that current page is 0, set exclusivestartkey to first paginated key,
     * and that subscription filter is set to what the new filter value is.
     */
    function handleFilterChange(e) {
        setCurrentTablePage(0);
        setExclusiveStartKey(['']);
        setSubscriptionFilter(e.target.value);
    }


    function transformCellData(key, cellData) {
        if(key === 'dateJoined') {
            const date = new Date(Number(cellData));
            return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
        } else {
            return cellData;
        }
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
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value={'all'}>All Subscribers</MenuItem>
                                    <MenuItem value={'event'}>Event Goers</MenuItem>
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
                                                    TABLE_BODY_CELLS.map(key => {
                                                        return (
                                                            <TableCell key={row.email+row[key]+i}>
                                                                {transformCellData(key, row[key])}
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
                    count={rowCount}
                    page={currentTablePage}
                    rowsPerPageOptions={[5]}
                    rowsPerPage={5}
                    onPageChange={handlePageChange}
                />
            </Paper>
        </Box>
    )
}