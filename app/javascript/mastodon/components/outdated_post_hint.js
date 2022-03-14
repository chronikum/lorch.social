import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { autoPlayGif } from 'mastodon/initial_state';

export default class OutDatedPostHint extends React.PureComponent {

  daysUntilPostIsDeclaredAsOutDated = 7;

  static propTypes = {
    status: ImmutablePropTypes.map.isRequired,
  };

  render () {
    const { status } = this.props;
    const postDate = new Date(status.get('created_at'));
    const dateNow = new Date();
    const diffTime = Math.abs(dateNow - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= this.daysUntilPostIsDeclaredAsOutDated) {
      return (
        <span className='outdated-post-container'>
          <h1>Dieser Post ist älter als sieben Tage. Prüfen Sie, ob die Anfrage oder das Angebot wirklich noch gültig ist.</h1>
        </span>
		  );
    }
    return ('');
  }

}
