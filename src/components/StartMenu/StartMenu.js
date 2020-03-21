import React from 'react';

import Button from '../Button';

import './StartMenu.scss';

const StartMenu = ({ setMode }) => (
    <div className="StartMenu">
        <h3 className="StartMenu__title">Choose mode</h3>
        <Button onClick={() => setMode('SINGLEPLAYER')}>Single player</Button>
        <Button onClick={() => setMode('MULTIPLAYER')}>Multiplayer</Button>
    </div>
);
 
export default StartMenu;