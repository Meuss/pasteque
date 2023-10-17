<script lang="ts">
	import Matter from 'matter-js';
	import { Circle } from '$lib/circle';
	import { Boundary } from '$lib/boundary';
	import p5 from 'p5';

	const { Engine } = Matter;
	const palette: [number, number, number][] = [
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
		let ground: Boundary;
		let left: Boundary;
		let right: Boundary;

		const createBoundaries = () => {
			const BWidth = 20;
			const BMargin = 10;
			const groundWidth = p.windowWidth - 2 * BWidth;
			const groundX = p.windowWidth / 2;
			const groundY = p.windowHeight - BMargin - BWidth / 2;
			const wallHeight = p.windowHeight - BWidth - 2 * BMargin;
			const wallY = p.windowHeight - BMargin - wallHeight / 2;
			const leftWallX = BMargin + BWidth / 2;
			const rightWallX = p.windowWidth - BMargin - BWidth / 2;
			ground = new Boundary(p, groundX, groundY, groundWidth, BWidth, world, palette[0]);
			left = new Boundary(p, leftWallX, wallY, BWidth, wallHeight, world, palette[0]);
			right = new Boundary(p, rightWallX, wallY, BWidth, wallHeight, world, palette[0]);

			if (ground) ground.removeFromWorld(world);
			if (left) left.removeFromWorld(world);
			if (right) right.removeFromWorld(world);

			ground = new Boundary(p, groundX, groundY, groundWidth, BWidth, world, palette[0]);
			left = new Boundary(p, leftWallX, wallY, BWidth, wallHeight, world, palette[0]);
			right = new Boundary(p, rightWallX, wallY, BWidth, wallHeight, world, palette[0]);
		};

		p.setup = function (): void {
			p.createCanvas(p.windowWidth, p.windowHeight);
			engine = Engine.create();
			world = engine.world;
			createBoundaries();
		};

		p.mousePressed = function (): void {
			circles.push(new Circle(p, p.mouseX, p.mouseY, p.random(10, 40), world));
		};

		p.draw = function (): void {
			p.background(palette[2]);
			Engine.update(engine);
			for (let i = 0; i < circles.length; i++) {
				circles[i].show();
			}
			ground.show();
			left.show();
			right.show();
		};

		p.windowResized = function () {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			createBoundaries();
		};
	};

	let myp5: p5;

	$: {
		myp5 = new p5(sketch);
	}

	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (myp5) {
			myp5.remove();
		}
	});
</script>
