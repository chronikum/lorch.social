import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { debounce } from 'lodash';
import { isUserTouching } from '../../../is_mobile';
import Icon from 'mastodon/components/icon';
import NotificationsCounterIcon from './notifications_counter_icon';

export const links = [
  <NavLink className='tabs-bar__link' to='/timelines/home' data-preview-title-id='column.home' data-preview-icon='home' ><Icon id='home' fixedWidth /><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/notifications' data-preview-title-id='column.notifications' data-preview-icon='bell' ><NotificationsCounterIcon /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Notifications' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/timelines/tag/Biete' data-preview-title-id='tabs_bar.search' data-preview-icon='book'><Icon className='column-link__icon' id='book' fixedWidth /><FormattedMessage id='tabs_bar.biete' defaultMessage='#BIETE' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/timelines/tag/Suche' data-preview-title-id='tabs_bar.search' data-preview-icon='search'><Icon className='column-link__icon' id='search' fixedWidth /><FormattedMessage id='tabs_bar.suche' defaultMessage='#SUCHE' /></NavLink>,
  <NavLink className='tabs-bar__link' to='/timelines/public/local' data-preview-title-id='column.community' data-preview-icon='users' ><Icon id='users' fixedWidth /><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='Neuste' /></NavLink>,
];

export function getIndex (path) {
  return links.findIndex(link => link.props.to === path);
}

export function getLink (index) {
  return links[index].props.to;
}

export default @injectIntl
@withRouter
class TabsBar extends React.PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  setRef = ref => {
    this.node = ref;
  }

  handleClick = (e) => {
    // Only apply optimization for touch devices, which we assume are slower
    // We thus avoid the 250ms delay for non-touch devices and the lag for touch devices
    if (isUserTouching()) {
      e.preventDefault();
      e.persist();

      requestAnimationFrame(() => {
        const tabs = Array(...this.node.querySelectorAll('.tabs-bar__link'));
        const currentTab = tabs.find(tab => tab.classList.contains('active'));
        const nextTab = tabs.find(tab => tab.contains(e.target));
        const { props: { to } } = links[Array(...this.node.childNodes).indexOf(nextTab)];


        if (currentTab !== nextTab) {
          if (currentTab) {
            currentTab.classList.remove('active');
          }

          const listener = debounce(() => {
            nextTab.removeEventListener('transitionend', listener);
            this.props.history.push(to);
          }, 50);

          nextTab.addEventListener('transitionend', listener);
          nextTab.classList.add('active');
        }
      });
    }

  }

  render () {
    const { intl: { formatMessage } } = this.props;

    return (
      <div className='tabs-bar__wrapper'>
        <nav className='tabs-bar' ref={this.setRef}>
          {links.map(link => React.cloneElement(link, { key: link.props.to, onClick: this.handleClick, 'aria-label': formatMessage({ id: link.props['data-preview-title-id'] }) }))}
        </nav>

        <div id='tabs-bar__portal' />
      </div>
    );
  }

}
