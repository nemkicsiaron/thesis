export default function calculateBetweenDates(begin: Date, end: Date): number {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - beginDate.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    return diffMinutes;
}