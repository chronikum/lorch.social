import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { invitesEnabled, version, repository, source_url } from 'mastodon/initial_state';
import { logOut } from 'mastodon/utils/log_out';
import { openModal } from 'mastodon/actions/modal';

const messages = defineMessages({
  logoutMessage: { id: 'confirmations.logout.message', defaultMessage: 'Are you sure you want to log out?' },
  logoutConfirm: { id: 'confirmations.logout.confirm', defaultMessage: 'Log out' },
});

const mapDispatchToProps = (dispatch, { intl }) => ({
  onLogout () {
    dispatch(openModal('CONFIRM', {
      message: intl.formatMessage(messages.logoutMessage),
      confirm: intl.formatMessage(messages.logoutConfirm),
      closeWhenConfirm: false,
      onConfirm: () => logOut(),
    }));
  },
});

export default @injectIntl
@connect(null, mapDispatchToProps)
class LinkFooter extends React.PureComponent {

  static propTypes = {
    withHotkeys: PropTypes.bool,
    onLogout: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleLogoutClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onLogout();

    return false;
  }

  render () {
    const { withHotkeys } = this.props;

    return (
      <div className='getting-started__footer'>
        <ul>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span className='button-danger' href='/auth/sign_out' onClick={this.handleLogoutClick}>Logout</span>
        </ul>

        <p>
          <FormattedMessage
            id='getting_started.open_source_notice_updated'
            defaultMessage='Dieses Projekt ist ein Fork von dem quelloffenem Mastodon und wird ehrenamtlich betreut. Technische Fehler können Sie @admin melden.'
            values={{ github: <span><a href={source_url} rel='noopener noreferrer' target='_blank'>{repository}</a> (v{version})</span> }}
          />
          <FormattedMessage
            id='getting_started.privacy'
            defaultMessage='Diese Seite gibt keine persönlichen Informationen an Dritte weiter, die Daten werden weder analysiert noch gesammelt. Sie läuft auf einem sicheren Server in Deutschland.'
            values={{ github: <span><a href={source_url} rel='noopener noreferrer' target='_blank'>{repository}</a> (v{version})</span> }}
          />
        </p>
      </div>
    );
  }

};
