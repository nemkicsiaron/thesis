
export const aggregatorUri: string = process.env["AGGREGATOR_URI"] || "http://localhost:4000";
export const port: number = parseInt(process.env["PORT"] || "5000");
export const ownUri: string = process.env["OWN_URI"] || `http://localhost:${port}`;