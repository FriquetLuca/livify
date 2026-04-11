const requests = new Map<string, { count: number; time: number }>();

export function isRateLimited(
    ip: string,
    route: string,
    limit: number,
    windowMs = 60000
) {
    const key = `${ip}:${route}`;
    const now = Date.now();

    const entry = requests.get(key);

    if (!entry) {
        requests.set(key, { count: 1, time: now });
        return false;
    }

    if (now - entry.time > windowMs) {
        requests.set(key, { count: 1, time: now });
        return false;
    }

    entry.count++;

    return entry.count > limit;
}
