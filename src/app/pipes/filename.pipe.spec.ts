import { FileNamePipe } from './filename.pipe';

describe('FilenamePipe', () => {
  it('create an instance', () => {
    const pipe = new FileNamePipe();
    expect(pipe).toBeTruthy();
  });
});
