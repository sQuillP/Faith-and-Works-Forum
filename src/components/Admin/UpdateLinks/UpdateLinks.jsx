import { Dialog, IconButton, Snackbar, Stack, Tooltip } from "@mui/material";
import "./styles/UpdateLinks.css";
import AddIcon from '@mui/icons-material/Add';

import AdminLinkItem from './AdminLinkItem';
import Footer from "../../_global/Footer";
import CreateAdminLink from "./CreateAdminLink";

import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
const DUMMY_LINKS = [
    {
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elitculpa facere.',
        link:'www.google.com',
        linkId:1
    },
    {
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit.  accusantium culpa facere.',
        link:'www.google.com',
        linkId:2
    },
    {
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.re.',
        link:'www.google.com',
        linkId:3
    },
    {
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. .',
        link:'www.google.com',
        linkId:4
    }
]

export default function UpdateLinks() {
    
    const navigate = useNavigate();

    const [fetchedLinks, setFetchedLinks]= useState(DUMMY_LINKS);
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

    function onCreateNewLink() {
        setShowLinkPopup(true);
    }


    function handleSearch(term) {
        // Grab list of links who's title includes the term
        if(term.trim() === '') {
            setSearchedLinks(fetchedLinks);
        } else {
            const filteredTitles = fetchedLinks.filter(link=> link.description.toLowerCase().includes(term) || link.link.toLowerCase().includes(term));
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

    async function onConfirmDeleteLink(boolean) {
        setShowDeletePopup(false);
        if(boolean === false) {
            return;
        }
        console.log('deleting');
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
                                            description={link.description}
                                            link={link.link}
                                            linkId={link.linkId}
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