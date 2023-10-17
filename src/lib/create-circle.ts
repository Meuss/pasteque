import { Circle } from '$lib/circle';

export function createCircle({ p, world }: CreateCircleOptions, x: number, y: number): Circle {
	const radius = p.random(10, 40);
	return new Circle({
		p,
		x,
		y,
		r: radius,
		world
	});
}
