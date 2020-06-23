/**
 * @format
 */

import 'react-native';
import React from 'react';
import CLSortModal from '../src/components/CLSortModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => jest.fn());
jest.mock('react-native-permissions', () => jest.fn());
jest.mock('react-native-qrcode-scanner', () => jest.fn());

it('renders correctly', () => {
  renderer.create(<CLSortModal />);
});
