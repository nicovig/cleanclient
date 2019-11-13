import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/import-fichier">
      <Translate contentKey="global.menu.entities.importFichier" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/import-ligne">
      <Translate contentKey="global.menu.entities.importLigne" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/ligne-prospect">
      <Translate contentKey="global.menu.entities.ligneProspect" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/facture">
      <Translate contentKey="global.menu.entities.facture" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
