import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import TemplateComponent from './TemplateComponent';
import 'whatwg-fetch';

describe('TemplateComponent', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    render(<TemplateComponent />);
  });

  it('초기 렌더링 시 입력창이 비어있고 버튼이 비활성화되어 있어야 함', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /click me/i });

    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });

  it('텍스트 입력 시 버튼이 활성화되어야 함', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.change(input, { target: { value: '테스트' } });

    expect(input).toHaveValue('테스트');
    expect(button).toBeEnabled();
  });

  it('10자 이상 입력 시 더 이상 입력되지 않아야 함', () => {
    const input = screen.getByRole('textbox');
    const longText = '12345678901';

    for (let i = 0; i < longText.length; i++) {
      fireEvent.change(input, { target: { value: longText.slice(0, i + 1) } });
    }

    expect(input).toHaveValue('1234567890');
  });

  it('버튼 클릭 시 div가 추가되고 api도 정상적으로 호출되어야함.', async () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.change(input, { target: { value: '테스트' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/테스트/)).toBeInTheDocument();
    });
  });
});
