import "./styles/Dashboard.css";
import { Stack } from "@mui/material";
import DashboardTile from './DashboardTile';
import PageTitle from "../../_global/PageTitle";
import Footer from "../../_global/Footer";


const dasboardItems = [
    {
        title:'Update Links',
        icon:'fa-solid fa-link',
        link:'/admin/updatelinks'
    },
    {
        title: "Manage Gathering",
        icon: 'fa-solid fa-calendar-days',
        link:'/admin/managegathering'
    },
    {
        title:'Update About',
        icon:'fa-solid fa-info',
        link:'/admin/updateabout'
    },
    {
        title:'Modify Contacts',
        icon:'fa-regular fa-address-book',
        link:'/admin/managecontacts'
    },
    {
        title:'Settings',
        icon:'fa-solid fa-gears',
        link:'/admin/settings',
    },
    {
        title: 'Home Page',
        icon:'fa-solid fa-home',
        link:'/'
    }
]


export default function Dashboard() {

    return (
        <>
            <div className="dashboard-main">
                <div className="dash-header">
                    <PageTitle showNavigation={false} title="Faith and Works Forum Dashboard"/>
                    <hr className="fancy-hr"/>
                    <p className="text dash-page-h2">What Would You Like To Do?</p>
                </div>
                <Stack
                    direction={'row'}
                    gap={3}
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    maxWidth={1000}
                    style={{margin: '0 auto', padding:'50px 0'}}
                >
                    {
                        dasboardItems.map(item => {
                            return (
                                <DashboardTile
                                    key={item.title}
                                    title={item.title}
                                    icon={item.icon}
                                    link={item.link}
                                />
                            )
                        })
                    }
                </Stack>
            </div>
            <Footer/>
        </>
    )
}