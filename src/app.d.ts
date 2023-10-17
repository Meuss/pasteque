// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type Color = [number, number, number];

	interface BoundaryOptions {
		p: p5;
		x: number;
		y: number;
		w: number;
		h: number;
		world: World;
		fill: Color;
	}

	interface CircleOptions {
		p: p5;
		x: number;
		y: number;
		r: number;
		world: World;
	}

	interface CreateCircleOptions {
		p: p5;
		world: World;
	}

	interface CreateBoundariesProps {
		p: p5;
		world: World;
		palette: Color[];
	}
}

export {};
