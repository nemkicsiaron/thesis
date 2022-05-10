export default function hashCode(pw: string): number {
    var hash: number = 0;
    if (pw.length == 0) return hash;
    for (let i = 0; i < pw.length; i++) {
        const char = pw.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}