import formatPhone from './formatPhone';

export default function clientInfo(client: any): string {
  return [
    client.phones.map((phone: string) => formatPhone(phone)).join('; '),
    client.first_name,
  ].join(': ');
}
