import type p5 from 'p5';
import { Bodies, Composite, Body } from 'matter-js';

export class Circle {
	private p: p5;
	private x: number;
	private y: number;
	private r: number;
	private body: Body;
	private color: Color;
	private palette: Color[] = [
		[171, 223, 255],
		[92, 205, 255],
		[0, 145, 228],
		[0, 72, 167],
		[0, 34, 79]
	];

	constructor(options: CircleOptions) {
		this.p = options.p;
		this.x = options.x;
		this.y = options.y;
		this.r = options.r;
		const args = {
			friction: 0.3,
			restitution: 0.15
		};
		this.body = Bodies.circle(this.x, this.y, this.r, args);

		this.color = this.p.random(this.palette);
		Composite.add(options.world, this.body);
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
