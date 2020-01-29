const rgb_to_hex = rgb =>
	rgb.reduce((hex, rgb, index) => {
		rgb = Number(rgb).toString(16);
		rgb = rgb.length < 2 ? `0${rgb}` : rgb;
		return `${hex}${index > 3 ? '' : rgb}`;
	}, '#');

const color_definitions = (red, green, blue) =>
	red > blue
		? red > green
			? 'red'
			: 'yellow'
		: green > red
		? green > blue
			? 'green'
			: 'cyan'
		: blue > green
		? blue > red
			? 'blue'
			: 'violet'
		: 'shade';

/**
 * @param {Number} [level=5] - interval of change from 0-255 for each color. i.e. 0 would be 16777216 color combinations.
 * @param {Number} index - index of the current color value 0, 1, or 2
 * @param {Number} rgb - value at current array index
 */

const color_callback = (level, index, rgb) => {
	const value = rgb * index * level;
	const depth = (255 / level);
	return rgb < 0
		? value + depth * level
		: rgb > 0
		? rgb === depth
			? depth * level
			: value
		: 0;
};

/**
 * @param {Number} [level=5] - interval of change from 0-255 for each color. i.e. 0 would be 16777216 color combinations.
 */

const color_matrix = level => [
	[1, 0, 0],
	[255 / level, 1, 0],
	[-1, 255 / level, 0],
	[0, 255 / level, 1],
	[0, -1, 255 / level],
	[1, 0, -1],
	[1, 1, 1]
];

/**
 * @param {Number} [level=5] - interval of change from 0-255 for each color. i.e. 0 would be 16777216 color combinations.
 * @returns {Object} Object with red, yellow, green, cyan, blue, violet, and shades as keys that should have an array of objects containing {rgb, hex}
 */

export default (level = 5) =>
	color_matrix(level)
		.map(v =>
			Array.from({length: 255 / level}, (_, index) =>
				v.map(rgb => color_callback(level, index, rgb))
			)
		)
		.reduce(
			(indexed, color) => ({
				...indexed,
				[color_definitions(...color[0])]: color.map(swatch => ({
					rgb: `rgb(${swatch})`,
					hex: rgb_to_hex(swatch)
				}))
			}),
			{}
		);