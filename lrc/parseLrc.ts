const TimestampRegex = /^((\[\d{2}:\d{2}\.\d{2}\])+).*$/g;

export function parseLines(lines: string) {}

/**
 * Given a timestamp in the format: [minutes:seconds] it gets converted to ms.
 * E.g: [00:30.20]. There will always be 2 decimal places for the seconds.
 *
 *
 * @param timestamp The timestamp to parse
 * @returns The timestamp in ms
 */
function timestampToMs(timestamp: string): number {
  // Remove the surrounding [ ]
  timestamp = timestamp.substring(1, timestamp.length - 1);

  const dividerIndex = timestamp.indexOf(':');

  const minutes = Number.parseInt(timestamp.substring(0, dividerIndex));
  const seconds = Number.parseFloat(timestamp.substring(dividerIndex + 1));

  const ms = minutes * 60 * 1000 + seconds * 1000;
  return ms;
}

function msToTimestamp(ms: number): string {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = (ms - minutes * 1000 * 60) / 1000;

  return `[${minutes.toFixed(0)}:${minutes.toFixed(2)}]`;
}
