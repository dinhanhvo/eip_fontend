import { SplitterModule } from './splitter.module';

describe('SplitterModule', () => {
  let splitterModule: SplitterModule;

  beforeEach(() => {
    splitterModule = new SplitterModule();
  });

  it('should create an instance', () => {
    expect(splitterModule).toBeTruthy();
  });
});
