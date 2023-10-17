import type p5 from 'p5';
import { Bodies, Composite, Body } from 'matter-js';

export class Boundary {
	private p: p5;
	private x: number;
	private y: number;
	private w: number;
	private h: number;
	private body: Body;
	private fill: Color;

	constructor(args: BoundaryOptions) {
		this.p = args.p;
		this.x = args.x;
		this.y = args.y;
		this.w = args.w;
		this.h = args.h;
		this.fill = args.fill;
		const options = {
			friction: 0.3,
			restitution: 0.6,
			isStatic: true
		};
		this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
		Composite.add(args.world, this.body);
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
}
