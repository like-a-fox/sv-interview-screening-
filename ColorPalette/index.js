import React, {memo} from 'react';
import {default as Palette} from './_Palette';
import {default as generatePalette} from './_generate_palette';

function ColorPalette() {
  const colorPalettes = generatePalette();
  const ColorPaletteArray = Object.keys(colorPalettes).map((color) => <Palette key={color} colorGroup={color} colorGroupSwatches={colorPalettes[color].slice(0,-colorPalettes[color].length % 5)} />);

  if (!colorPalettes) {
    return null;
  }
  return (
    <>
    {ColorPaletteArray}
    </>
  )
};

export default memo(ColorPalette);