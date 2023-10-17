<script lang="ts">
	import { onDestroy } from 'svelte';
	import Matter from 'matter-js';
	import type { Circle } from '$lib/circle';
	import type { Boundary } from '$lib/boundary';
	import { createCircle } from '$lib/create-circle';
	import { createBoundaries } from '$lib/create-boundaries';
	import p5 from 'p5';

	const { Engine } = Matter;
	const palette: Color[] = [
		[54, 103, 133],
		[107, 142, 164],
		[204, 204, 204],
		[228, 134, 70],
		[200, 82, 0]
	];

	let sketch = (p: p5) => {
		let engine: Matter.Engine;
		let world: Matter.World;
		let circles: Circle[] = [];
		let boundaries: { ground: Boundary; left: Boundary; right: Boundary };

		p.setup = function (): void {
			p.createCanvas(p.windowWidth, p.windowHeight);
			engine = Engine.create();
			world = engine.world;
			boundaries = createBoundaries({ p, world, palette });
		};

		p.mousePressed = function (): void {
			const newCircle = createCircle({ p, world }, p.mouseX, p.mouseY);
			circles.push(newCircle);
		};

		p.draw = function (): void {
			p.background(palette[2]);
			Engine.update(engine);
			for (const circle of circles) {
				circle.show();
			}
			boundaries.ground.show();
			boundaries.left.show();
			boundaries.right.show();
		};

		p.windowResized = function () {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			boundaries = createBoundaries({ p, world, palette });
		};
	};

	let myp5: p5;

	$: {
		myp5 = new p5(sketch);
	}

	onDestroy(() => {
		if (myp5) {
			myp5.remove();
		}
	});
</script>
