import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const url = new URL('https://localhost:3000/qa/questions');

  url.searchParams.append('product_id', '');
  url.searchParams.append('page', '1');
  url.searchParams.append('count', '5');
  http.get('https://localhost:3000/qa/questions');
  sleep(1);
}