import React from 'react';
import { AppBar, IconButton } from '@material-ui/core';
import { Link } from "react-router-dom";
import { LogoContainer, LogoTypography, CustomHomeIcon, CustomSubscriptionIcon, CustomToolbar, CustomContactlessIcon } from '../CustomComponents';

interface Props {

}

const NavBar: React.FC<Props> = () => {
    return (
        <AppBar position="static">
            <CustomToolbar>
                <LogoContainer>
                    <CustomContactlessIcon />
                    <LogoTypography variant="h6" noWrap>
                        Cycode Challenge
                    </LogoTypography>
                </LogoContainer>
                <div>
                    <IconButton>
                        <Link to="/"><CustomHomeIcon color="secondary" /></Link>
                    </IconButton>
                    <IconButton>
                        <Link to="/subscribe"><CustomSubscriptionIcon /></Link>
                    </IconButton>
                </div>
            </CustomToolbar>
        </AppBar>
    )
}

export default NavBar;