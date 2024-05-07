class TokenBucket {
    constructor(capacity, tokensPerInterval) {
        this.capacity = capacity; // Capacidad máxima del cubo
        this.tokens = capacity; // Tokens disponibles inicialmente
        this.tokensPerInterval = tokensPerInterval; // Tokens agregados por intervalo
        this.lastRefillTime = Date.now(); // Último tiempo de recarga

        // Función para rellenar los tokens
        setInterval(() => this.refill(), 1000);
    }

    refill() {
        const now = Date.now();
        const elapsedTime = now - this.lastRefillTime;
        this.lastRefillTime = now;

        // Calcular los tokens agregados durante el intervalo
        const tokensToAdd = elapsedTime * (this.tokensPerInterval / 1000);
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    }

    takeToken() {
        if (this.tokens >= 1) {
            this.tokens--;
            return true; // Se toma un token exitosamente
        } else {
            return false; // No hay tokens disponibles
        }
    }
}

module.exports = TokenBucket;

