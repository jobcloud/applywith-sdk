/**
 * @jest-environment jsdom
 * @flow
 */
import render, { reset } from '../proxyFrame';

const createFrame = path => {
  const container = document.createElement('div');
  render(container, path);
  return container;
};

describe('proxyFrame', () => {
  afterEach(() => {
    reset();
  });
  it('renders anchor in container', () => {
    const container = createFrame();
    expect(container.children.length).toBe(1);
    expect(container.children[0].tagName).toBe('IFRAME');
  });
  it('renders frame with correct default structure', () => {
    const anchor = createFrame();
    expect(anchor.innerHTML).toMatchSnapshot();
  });
  it('renders frame with overwritten pathname', () => {
    const origin = 'http://localhost:8081';
    const pathname = `${origin}/button.html`;
    const frame = createFrame(pathname).children[0];
    expect(frame.getAttribute('src')).toContain(pathname);
  });
});
