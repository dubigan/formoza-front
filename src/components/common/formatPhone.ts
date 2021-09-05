export default function formatPhone(value: string, format = '(XXX) XXX-XX-XX'): string {
  const formatChars = 'Xx'.split('');
  const valArray = value.split('');
  let valIndex = 0;
  const out: string[] = [];
  format.split('').map(fChar => {
    //console.log('formatPhone', fChar);

    if (formatChars.includes(fChar)) {
      out.push(valArray[valIndex++]);
    } else {
      out.push(fChar);
    }
  });
  return out.join('');
}
