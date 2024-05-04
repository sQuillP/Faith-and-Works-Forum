import { Dialog, IconButton, Snackbar, Stack, Tooltip } from "@mui/material";
import "./styles/UpdateLinks.css";
import AddIcon from '@mui/icons-material/Add';

import AdminLinkItem from './AdminLinkItem';
import Footer from "../../_global/Footer";
import CreateAdminLink from "./CreateAdminLink";

import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

import { ifawfAdmin } from "../../_global/ifawf-api";



export default function UpdateLinks() {
    
    const navigate = useNavigate();

    const [fetchedLinks, setFetchedLinks]= useState([]);
    const [searchedLinks, setSearchedLinks] = useState(fetchedLinks);
    const [searchTerm, setSearchTerm] = useState('');

    // For creating a new link.
    const [showLinkPopup, setShowLinkPopup] = useState(false);

    //for deleting a link
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // For editing a link
    const [showEditLinkPopup, setShowEditLinkPopup] = useState(false);
    // Passed to child popup for editing a link.
    const [updateLinkData, setUpdateLinkData] = useState(null);

    // When user selects an item to delete, this will be updated for hte popup.
    const [deleteData, setDeleteData] = useState(null);

    console.log('fetched links', fetchedLinks);
    useEffect(()=> {
        (async ()=>{
            const linkResponse = await ifawfAdmin.get('/links');
            const links = linkResponse.data.data;
            setFetchedLinks(links);
            setSearchedLinks(links);
            console.log('links!', links);
        })()
    },[]);


    function onCreateNewLink() {
        setShowLinkPopup(true);
    }


    function handleSearch(term) {
        // Grab list of links who's title includes the term
        if(term.trim() === '') {
            setSearchedLinks(fetchedLinks);
        } else {
            const filteredTitles = fetchedLinks.filter(link=> link.title.toLowerCase().includes(term) || link.link.toLowerCase().includes(term));
            setSearchedLinks(filteredTitles);
        }
    }


    function onOpenUpdatePopup(linkData) {
        setUpdateLinkData(linkData);
        setShowEditLinkPopup(true);
    }

    function onDeleteLink(linkData) {
        setShowDeletePopup(true);
        setDeleteData(linkData);
        console.log('firing deletelink')
    }


    // TODO: Work on this part a bit more. Handle better error handling.
    async function onConfirmDeleteLink(boolean) {
        if(boolean === false) {
            setShowDeletePopup(false);
            return;
        }
        try {
            console.log('actual delete data', deleteData);
            console.log({title:deleteData.title})
            const deleteResponse = await ifawfAdmin.delete('/links',{data:{title:deleteData.title}});
            if(deleteResponse.data.status >= 400) {
                console.log('unable to delete link');
            } else {
                setSearchedLinks(deleteResponse.data.data);
                setFetchedLinks(deleteResponse.data.data);
            }
        } catch(error) {
            console.log('deleting');
        } finally {
            setShowDeletePopup(false);
        }
    }


    /**
     * @description takes a list of updated links called from the CreateAdminLink Component.
     * If array is provided, the list of links will be updated accordingly
     * @param {*} updatedLinks 
     */
    function handleLinkUpdates(updatedLinks) {
        if(updatedLinks != null){
            // add updated links to state
            setFetchedLinks(updatedLinks);
            setSearchedLinks(updatedLinks)
        }
        setShowLinkPopup(false);
        setShowEditLinkPopup(false);
    }



    return (
        <>
            <CreateAdminLink
                open={showLinkPopup}
                update={false}
                updateLinks={handleLinkUpdates}
            />
            {
                //NOTE: Some rendering issues when not short circuited. This should be fixed in the future.
                showEditLinkPopup && (
                    <CreateAdminLink
                        open={showEditLinkPopup}
                        update={true}
                        linkData={updateLinkData}
                        updateLinks={handleLinkUpdates}
                    />
                )
            }
            <ConfirmDelete
                onDelete={onConfirmDeleteLink}
                open={showDeletePopup}
            />
            <div className="u-links-main">
                <div className="u-links-container">
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Tooltip title='Back to dashboard'>
                            <IconButton onClick={()=> navigate('/admin/dashboard')}>
                                <ArrowBack/>
                            </IconButton>
                        </Tooltip>
                        <div className="ul-link-header-wrapper">
                            <p className="text link-header">Manage Links</p>
                        </div>
                        <div></div>
                    </Stack>
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        gap={2}
                    >
                        <div className="ul-link-input-wrapper">
                            <input onChange={(e)=> handleSearch(e.target.value)} placeholder="Search Link or URL..." type="text" className="ul-link-input" />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <Tooltip title="Create New Link">
                            <IconButton onClick={onCreateNewLink}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <div className="ul-link-body">
                        {
                            searchedLinks.length === 0 ? (
                                <>
                                    <p className="empty-link-p">404</p>
                                    <p className="link-header">No links found.</p>
                                </>
                            ): (
                                searchedLinks.map((link, i) => {
                                    return (
                                        <AdminLinkItem
                                            key={i}
                                            title={link.title}
                                            link={link.link}
                                            onUpdate={onOpenUpdatePopup}
                                            onDelete={onDeleteLink}
                                        />
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}