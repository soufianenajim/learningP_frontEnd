import { MashAblePage } from './app.po';

describe('mash-able App', () => {
  let page: MashAblePage;

  beforeEach(() => {
    page = new MashAblePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
