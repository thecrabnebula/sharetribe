import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';
import classNames from 'classnames';

import { className } from '../../../utils/PropTypes';
import ProfileDropdown from './ProfileDropdown';
import Avatar from '../../elements/Avatar/Avatar';
import NotificationBadge from '../../elements/NotificationBadge/NotificationBadge';

import css from './AvatarDropdown.css';

const isTouch =
  !!(typeof window !== 'undefined' &&
    (('ontouchstart' in window) ||
      window.navigator.msMaxTouchPoints > 0));

class AvatarDropdown extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  handleClick() {
    if (isTouch) {
      this.setState({ isOpen: !this.state.isOpen });// eslint-disable-line react/no-set-state
    }
  }

  handleBlur() {
    this.setState({ isOpen: false });// eslint-disable-line react/no-set-state
  }

  render() {
    const touchClass = isTouch ? '' : css.touchless;
    const openClass = this.state.isOpen ? css.openDropdown : '';
    const notificationsClass = this.props.notificationCount > 0 ? css.hasNotifications : null;
    const notificationBadgeInArray = this.props.notificationCount > 0 ?
      [r(NotificationBadge, { className: css.notificationBadge }, this.props.notificationCount)] :
      [];
    return div({
      onClick: this.handleClick,
      onBlur: this.handleBlur,
      tabIndex: 0,
      className: classNames(this.props.className, touchClass, openClass, css.avatarDropdown, notificationsClass),
    }, [
      div({ className: css.avatarWithNotifications }, [
        r(Avatar, this.props.avatar),
      ].concat(notificationBadgeInArray)),
      r(ProfileDropdown, {
        className: css.avatarProfileDropdown,
        customColor: this.props.customColor,
        actions: this.props.actions,
        isAdmin: this.props.isAdmin,
        notificationCount: this.props.notificationCount,
        translations: this.props.translations,
      }),
    ]);
  }
}

AvatarDropdown.propTypes = {
  avatar: PropTypes.shape(Avatar.propTypes).isRequired,
  notificationCount: PropTypes.number,
  ...ProfileDropdown.propTypes,
  className,
};

export default AvatarDropdown;
