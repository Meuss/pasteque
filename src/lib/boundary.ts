import type p5 from 'p5';
import { Bodies, Composite, World, Body } from 'matter-js';

export class Boundary {
	private p: p5;
	private x: number;
	private y: number;
	private w: number;
	private h: number;
	private body: Body;
	private fill: [number, number, number];

	constructor(
		p: p5,
		x: number,
		y: number,
		w: number,
		h: number,
		world: World,
		fill: [number, number, number]
	) {
		this.p = p;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fill = fill;
		const options = {
			friction: 0.3,
			restitution: 0.6,
			isStatic: true
		};
		this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
		Composite.add(world, this.body);
	}

	public show(): void {
		const pos = this.body.position;
		const angle = this.body.angle;
		this.p.push();
		this.p.translate(pos.x, pos.y);
		this.p.rotate(angle);
		this.p.rectMode(this.p.CENTER);
		this.p.strokeWeight(1);
		this.p.noStroke();
		this.p.fill(...this.fill);
		this.p.rect(0, 0, this.w, this.h);
		this.p.pop();
	}

	public removeFromWorld(world: World): void {
		Composite.remove(world, this.body);
	}
}
