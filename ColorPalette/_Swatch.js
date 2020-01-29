import React, {memo} from 'react';
const getContrastColor = rgb => {
  let invertRgb = rgb.replace(/(?<=\().*(?=\))/gi, rgbStr => rgbStr.split(',').map(colorValue =>Math.floor(150-(150/255 *colorValue))).join(','))
  return invertRgb
}
const swatchStyles=({swatchWidth= 'calc(100vw / 5)', backgroundColor})=> ({
  backgroundColor: backgroundColor,
  minWidth: swatchWidth,
  width: 'auto',
  height: swatchWidth,
  display: 'inline-flex',
  padding: '1rem',
  color: `${getContrastColor(backgroundColor)}`,
  mixBlendMode: 'difference',
  fontSize: '1rem',
  fontWeight: '600',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  '&:hover': {
    filter: 'invert(100%)'
  }
})

function Swatch(props) {
  const {backgroundColor, colorGroup, colorId} = props;
  const style = swatchStyles(props);
  return (
    <div style={style}>{colorId}</div>
  )
}

export default memo(Swatch)