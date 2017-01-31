import { EarlymapPage } from './app.po';

describe('earlymap App', function() {
  let page: EarlymapPage;

  beforeEach(() => {
    page = new EarlymapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
