import { memo } from 'react';
import { PageLayout } from '../../../Layout/Components/PageLayout';
import AddIcon from '@mui/icons-material/Add';

type Props = {}
const DashBoard = (props: Props) => {

    let actions: Array<any> = [
        {
            label: "Add",
            icon: <AddIcon style={{ fontSize: '11px' }} />,
            onClick: (data: Object) => addItem(data),
        },
    ];
    const addItem = (data: Object) => {
    }
    return (
        <PageLayout title="Dashboard" actions={[]} >
            <div>
                Contents
            </div>
        </PageLayout >
    )
}
export default memo(DashBoard);
