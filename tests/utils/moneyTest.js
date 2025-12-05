import { formatMoney } from '../../scripts/utils.js/money.js'
// unit test== testing one piece of code
//integration test == tests many units /pieces of codeworking together
describe('test suite:formatCurrency', () => {
  it('convert cents to dollar', () => {
    expect(formatMoney(2095)).toEqual('20.95');
  });

  it('works  with zero', () => {
    expect(formatMoney(0)).toEqual('0.00');
  });

  it('workss nearest  round number ',()=>{
    expect(formatMoney(2000.5)).toEqual('20.01');
  })
});