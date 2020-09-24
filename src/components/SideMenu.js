import React from "react";
import MenuItem from "./MenuItem";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import { useHistory } from "react-router-dom";

function SideMenu({ isOpen, setOpen, isMobile }) {
    const history = useHistory(); 

    return (
        <div className={'side-menu' + (!isOpen ? ' hidden' : '')}>
            <MenuItem name={'Dashboard'} handleClick={() => { isMobile && setOpen(false); history.push('/dashboard') }} icon={<MdDashboard/>}/>
            <MenuItem name={'Add transaction'} handleClick={() => { isMobile && setOpen(false); history.push('/addTransaction') }} icon={<GrTransaction/>}/>
            <MenuItem name={'Transactions list '} handleClick={() => { isMobile && setOpen(false); history.push('/transactionsList') }} icon={<AiOutlineOrderedList/>}/>
            <MenuItem divider={true}/>
            <MenuItem name={'Add recipe '} handleClick={() => { isMobile && setOpen(false); history.push('/addRecipe') }} icon={<GiCookingPot/>}/>
            <MenuItem name={'Recipes list '} handleClick={() => { isMobile && setOpen(false); history.push('/recipesList') }} icon={<AiOutlineOrderedList/>}/>
        </div>
    )
}

export default SideMenu;