import axios from 'axios';

class AddBill {
  static async post() {
    const resp = await axios.post('http://localhost:5678');
    return resp.data;
  }
}
export default AddBill;

export const billsMock =[ 
  {
    email: 'a@a',
    type: 'Transports',
    name:  'Train Paris-Suisse',
    amount: '300€',
    date:  '2022-01-10',
    vat: 10,
    pct: 20,
    commentary: "",
    fileUrl: 'https://stockimage.com/image.png',
    fileName: 'image.png',
    status: 'pending'
  }];
  