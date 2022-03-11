import { connect } from 'react-redux';
import {
  changeSearch,
  clearSearch,
  showSearch,
  submitSearch,
} from '../../../actions/search';
import Search from '../components/search';

const mapStateToProps = state => ({
  value: state.getIn(['search', 'value']),
  submitted: state.getIn(['search', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onChange (value) {
    dispatch(changeSearch(value));
  },

  onClear () {
    dispatch(clearSearch());
  },

  onSubmit (tags) {
    dispatch(submitSearch(tags || ''));
  },

  onShow () {
    dispatch(showSearch());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
