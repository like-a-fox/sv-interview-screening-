import React, {memo} from 'react';
import {default as Swatch} from './_Swatch';

const paletteStyles=()=> ({
  maxWidth: '100vw',
  width: '-webkit-fill-available',
  height:  '100%',
  display: 'flex',
  flexWrap: 'wrap',
  padding: 0,
  fontSize: '1rem',
  fontWeight: '600',
  alignItems: 'stretch',
  justifyContent: 'space-evenly',
})

function Palette(props) {
  const {colorGroup, colorGroupSwatches} = props;
  const style = paletteStyles(props);
  if (!colorGroupSwatches || !colorGroupSwatches.length) {
    return null;
  }
  const SwatchArray=colorGroupSwatches.map(({rgb, hex})=> <Swatch key={hex} colorId={hex} backgroundColor={rgb} colorGroup={colorGroup} />)
  return (
    <div style={style}>{SwatchArray}</div>
  )
}

export default memo(Palette)