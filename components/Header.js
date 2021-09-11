import React from "react";
import { Menu } from "semantic-ui-react";

export const Header = () => {
    return (
        <Menu style={{ marginTop: "15px" }}>
            <Menu.Menu position="right" />
            <Menu.Item>Campaigns</Menu.Item>

            <Menu.Item>+ </Menu.Item>
        </Menu>
    );
};
