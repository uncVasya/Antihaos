import React from 'react';
import {
  Button, ButtonGroup, NavItem,
} from 'reactstrap';
import { NavLink as DomLink } from 'react-router-dom';
import './Main.css';
import AuthMain from '../AuthMain/AuthMain';


function Main() {
  return (
    <AuthMain>
      <div className="rega">
        {/* <ButtonGroup className="buttony">
          <NavItem>
            <DomLink to="/signup" className="lign">
              <Button className="buttt">
                Зарегаться
              </Button>
            </DomLink>
          </NavItem>
          <NavItem>
            <DomLink to="/signin" className="lign">
              <Button className="buttt">
                Войти
              </Button>
            </DomLink>
          </NavItem>
        </ButtonGroup> */}
      </div>
    </AuthMain>
  );
}

export default Main;
