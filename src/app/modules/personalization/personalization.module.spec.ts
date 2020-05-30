import { PersonalizationModule } from './personalization.module';

describe('PersonalizationModule', () => {
  let personalizationModule: PersonalizationModule;

  beforeEach(() => {
    personalizationModule = new PersonalizationModule();
  });

  it('should create an instance', () => {
    expect(personalizationModule).toBeTruthy();
  });
});
