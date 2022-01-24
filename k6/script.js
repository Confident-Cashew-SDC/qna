import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 100,
  duration: '30s'
  // target:
};

export default function () {
  var randomID = Math.floor(Math.random() * (1000011));
  var params = {
    product_id: randomID,
    page: 1,
    count: 5
  }
  const url = new URL('https://k6.io');
  url.searchParams.append('product_id', `${randomID}`);
  url.searchParams.append('page', '1');
  url.searchParams.append('count', '5');
  const res = http.get(url.toString());
  check(res, {
    'is status 200': r => r.status === 200,
    'Return time < 75ms': r => r.timings.duration < 75,
    'Return time < 100ms': r => r.timings.duration < 100,
    'Return time < 125ms': r => r.timings.duration < 125,
    'Return time < 150ms': r => r.timings.duration < 150,
    'Return time < 175ms': r => r.timings.duration < 175,
    'Return time < 200ms': r => r.timings.duration < 200,
    'Return time < 250ms': r => r.timings.duration < 250,
    'Return time < 300ms': r => r.timings.duration < 300,
    'Return time < 350ms': r => r.timings.duration < 350,
    'Return time < 500ms': r => r.timings.duration < 500,
    'Return time < 600ms': r => r.timings.duration < 600,
})
  // http.get(`http://localhost:3000/qa/questions/${randomID}`)
  sleep(1);


};

// export default function () {
//   var randomID = Math.floor(Math.random() * (3518979));
//   var params = {
//     page: 1,
//     count: 5
//   }
//   // url.searchParams.append('product_id', `${randomID}`);
//   // url.searchParams.append('page', '1');
//   // url.searchParams.append('count', '5');
//   var res = http.get(`http://localhost:3000/qa/questions/${randomID}/answers`, params);
//   check(res, {
//     'is status 200': r => r.status === 200,
//     'Return time < 75ms': r => r.timings.duration < 75,
//     'Return time < 100ms': r => r.timings.duration < 100,
//     'Return time < 125ms': r => r.timings.duration < 125,
//     'Return time < 150ms': r => r.timings.duration < 150,
//     'Return time < 175ms': r => r.timings.duration < 175,
//     'Return time < 200ms': r => r.timings.duration < 200,
//     'Return time < 250ms': r => r.timings.duration < 250,
//     'Return time < 300ms': r => r.timings.duration < 300,
//     'Return time < 350ms': r => r.timings.duration < 350,
//     'Return time < 500ms': r => r.timings.duration < 500,
//     'Return time < 600ms': r => r.timings.duration < 600,
// })
//   sleep(1);
// };

// export default function () {
//   var randomID = Math.floor(Math.random() * (1000011));
//   var params = {
//     body: 'test',
//     name: 'test',
//     email: 'test@gmail.com',
//     product_id: randomID
//   }
//   // url.searchParams.append('product_id', `${randomID}`);
//   // url.searchParams.append('page', '1');
//   // url.searchParams.append('count', '5');
//   http.post(`http://localhost:3000/qa/questions/`, params);
//   sleep(1);
// };

// export default function () {
//   var randomID = Math.floor(Math.random() * (3518979));
//   var params = {
//     body: 'test',
//     name: 'test',
//     email: 'test@gmail.com',
//     photos: ['urlplaceholder/answer_5_photo_number_1.jpg', 'urlplaceholder/answer_5_photo_number_2.jpg']
//   }
//   // url.searchParams.append('product_id', `${randomID}`);
//   // url.searchParams.append('page', '1');
//   // url.searchParams.append('count', '5');
//   http.post(`http://localhost:3000/qa/questions/${randomID}/answers`, params);
//   sleep(1);
// };