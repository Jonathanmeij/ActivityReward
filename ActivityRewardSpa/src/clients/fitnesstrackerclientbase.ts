export class FitnessTrackerClientBase {
    transformOptions(options: RequestInit) {
        const headers = new Headers(options.headers);
        headers.set("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
        options.headers = headers;
        return Promise.resolve(options);
    }
}
