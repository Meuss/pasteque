import type p5 from 'p5';
import { Bodies, Composite, World, Body } from 'matter-js';

export class Circle {
	private p: p5;
	private x: number;
	private y: number;
	private r: number;
	private body: Body;
	private color: [number, number, number];
	private palette: [number, number, number][] = [
		[171, 223, 255],
		[92, 205, 255],
		[0, 145, 228],
		[0, 72, 167],
		[0, 34, 79]
	];

	constructor(p: p5, x: number, y: number, r: number, world: World) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.r = r;
		const options = {
			friction: 0.3,
			restitution: 0.15
		};
		this.body = Bodies.circle(this.x, this.y, this.r, options);

		this.color = this.p.random(this.palette);
		Composite.add(world, this.body);
	}

	public show(): void {
		const pos = this.body.position;
		this.p.push();
		this.p.translate(pos.x, pos.y);
		this.p.strokeWeight(1);
		this.p.stroke(21);
		this.p.fill(this.color);
		this.p.circle(0, 0, this.r * 2);
		this.p.pop();
	}
}
