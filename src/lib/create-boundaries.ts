import { Boundary } from '$lib/boundary';

export function createBoundaries({ p, world, palette }: CreateBoundariesProps): {
	ground: Boundary;
	left: Boundary;
	right: Boundary;
} {
	const BWidth = 20;
	const BMargin = 10;
	const groundWidth = p.windowWidth - 2 * BWidth;
	const groundX = p.windowWidth / 2;
	const groundY = p.windowHeight - BMargin - BWidth / 2;
	const wallHeight = p.windowHeight - BWidth - 2 * BMargin;
	const wallY = p.windowHeight - BMargin - wallHeight / 2;
	const leftWallX = BMargin + BWidth / 2;
	const rightWallX = p.windowWidth - BMargin - BWidth / 2;

	let ground: Boundary | null = null;
	let left: Boundary | null = null;
	let right: Boundary | null = null;

	ground = new Boundary({
		p,
		x: groundX,
		y: groundY,
		w: groundWidth,
		h: BWidth,
		world,
		fill: palette[0]
	});
	left = new Boundary({
		p,
		x: leftWallX,
		y: wallY,
		w: BWidth,
		h: wallHeight,
		world,
		fill: palette[0]
	});
	right = new Boundary({
		p,
		x: rightWallX,
		y: wallY,
		w: BWidth,
		h: wallHeight,
		world,
		fill: palette[0]
	});

	return { ground, left, right };
}
