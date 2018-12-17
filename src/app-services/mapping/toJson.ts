export default function(this: any) {
  return JSON.parse(JSON.stringify(this));
}
