export function transformJsonToFile(jsonString: string) {
  return Buffer.from(jsonString, 'utf-8');
}
