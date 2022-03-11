import { connect } from 'react-redux';
import {
  changeSearch,
  clearSearch,
  submitSearchWithTags,
  showSearch,
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
    dispatch(submitSearchWithTags(tags));
  },

  onShow () {
    dispatch(showSearch());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
