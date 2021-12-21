import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from './FavoritesProvider';
import defineBlock from '../../../utils/defineBlock';
import './FavoriteButton.scss';

export const bem = defineBlock('FavoriteButton');

const FavoriteButton = ({
  code,
  type
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  return isFavorite(code, type)
    ? (
      <IconButton
        className={bem('', { active: true })}
        aria-label="unfavorite this item"
        onClick={() => { removeFavorite(code, type); }}
        edge="start"
        color="inherit"
      >
        <FavoriteIcon />
      </IconButton>
    )
    : (
      <IconButton
        className={bem('', { active: false })}
        aria-label="favorite this item"
        onClick={() => { addFavorite(code, type); }}
        edge="start"
        color="inherit"
      >
        <FavoriteBorderIcon />
      </IconButton>
    );
};

FavoriteButton.propTypes = {
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default FavoriteButton;
