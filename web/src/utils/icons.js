import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NAV_ITEMS, ACTION_BUTTONS} from "./constants";


export const ICONS  =   {
    [NAV_ITEMS.users.name]: <PeopleIcon />,
    [NAV_ITEMS.recipes.name]: <ReceiptIcon />,
    [ACTION_BUTTONS.delete.name]: <DeleteIcon />,
    [ACTION_BUTTONS.save.name]: <SaveIcon />,
    [ACTION_BUTTONS.edit.name]: <EditIcon />,
    [ACTION_BUTTONS.cancel.name]: <CancelIcon />,
    [ACTION_BUTTONS.create.name]: <AddCircleOutlineIcon />,
    [ACTION_BUTTONS.back.name]: <ArrowBackIcon />,
}
