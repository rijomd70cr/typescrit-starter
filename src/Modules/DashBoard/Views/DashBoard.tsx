import React from 'react'
import { PageLayout } from '../../../Layout/Components/PageLayout';
import AddIcon from '@mui/icons-material/Add';

type Props = {}
let actions: Array<any> = [
    {
        label: "Add",
        icon: <AddIcon style={{ fontSize: '11px' }} />,
        onClick: (data: Object) => addItem(data),
    },
];

const addItem = (data: Object) => {
    console.log("haai");
}

const DashBoard = (props: Props) => {
    return (
        <PageLayout title="Dashboard" actions={[]} >
            <div>
                Contents
            </div>
        </PageLayout >
    )
}

export default DashBoard;