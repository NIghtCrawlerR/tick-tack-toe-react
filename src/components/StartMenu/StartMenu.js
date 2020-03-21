import React from 'react';

import {
  SINGLE_PLAYER,
  MULTI_PLAYER,
  PLAYER_0,
  PLAYER_X,
} from '../../config';
import Button from '../Button';

import './StartMenu.scss';

const StartMenu = ({ setMode, setPlayer, mode }) => (
  <div className="StartMenu">
    {!mode && (
      <>
        <h3 className="StartMenu__title">Choose mode</h3>
        <Button onClick={() => setMode(SINGLE_PLAYER)}>Single player</Button>
        <Button onClick={() => setMode(MULTI_PLAYER)}>Multiplayer</Button>
      </>
    )}
    {mode && mode === SINGLE_PLAYER && (
      <>
        <h3 className="StartMenu__title">Choose player</h3>
        <Button onClick={() => setPlayer(PLAYER_X)}>X</Button>
        <Button onClick={() => setPlayer(PLAYER_0)}>0</Button>
      </>
    )}
  </div>
);
 
export default StartMenu;