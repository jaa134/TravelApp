import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from './FavoritesProvider';

const FavoriteButton = ({
  code,
  type
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  return isFavorite(code, type)
    ? (
      <IconButton
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
