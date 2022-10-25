import { render } from '@testing-library/react';

import InputBox from "./InputBox";

describe('InputBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputBox />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the label component and display the label text if one is passed in', () => {
    const props = {
      label: 'Name',
    };

    const { getByTestId } = render(<InputBox {...props} />);
    expect(getByTestId('textInputLabel').textContent).toMatch('Name');
  });

  it('should render the error component and display the error text if one is passed in', () => {
    const props = {
      error: 'This field is required',
    };

    const { getByTestId } = render(<InputBox {...props} />);
    expect(getByTestId('textInputError').textContent).toMatch(
      'This field is required'
    );
  });
});