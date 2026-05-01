class SocketService {
  constructor() {
    this.listeners = [];
    this.mockCount = 3;
    this.interval = null;
  }

  connect() {
    // симулируем подключение к сокет-серверу
    console.log('🟢 WebSocket connected (mock)');

    // каждые 5 секунд меняем количество сессий
    this.interval = setInterval(() => {
      // случайное число от 1 до 15
      this.mockCount = Math.floor(Math.random() * 15) + 1;
      this.notifyListeners(this.mockCount);
    }, 5000);
  }

  onSessionCount(callback) {
    this.listeners.push(callback);
    // сразу отдаём текущее значение
    callback(this.mockCount);
  }

  notifyListeners(count) {
    this.listeners.forEach((cb) => cb(count));
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log('🔴 WebSocket disconnected');
  }
}

export default new SocketService();
