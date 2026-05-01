type EventCallback = (payload?: any) => void;

class EventBus {
	private events: Map<string, EventCallback[]> = new Map();

	on(event: string, callback: EventCallback) {
		if (!this.events.has(event)) {
			this.events.set(event, []);
		}
		this.events.get(event)!.push(callback);
	}

	off(event: string, callback: EventCallback) {
		if (!this.events.has(event)) return;
		const callbacks = this.events.get(event)!;
		const index = callbacks.indexOf(callback);
		if (index !== -1) callbacks.splice(index, 1);
	}

	emit(event: string, payload?: any) {
		if (!this.events.has(event)) return;
		this.events.get(event)!.forEach(callback => callback(payload));
	}

	once(event: string, callback: EventCallback) {
		const wrapper = (payload?: any) => {
			callback(payload);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
	}
}

export default new EventBus();