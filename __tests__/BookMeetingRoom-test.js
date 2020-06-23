/**
 * @format
 */

import 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import BookMeetingRoom from '../src/view/BookRoom/BookMeetingRoom';
import NetworkCalls from '../src/network/NetworkCalls';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => jest.fn());
jest.mock('react-native-permissions', () => jest.fn());
jest.mock('react-native-qrcode-scanner', () => jest.fn());
jest.mock('@react-native-community/netinfo', () => {
  return {
    getVersion: jest.fn(() => Promise.resolve('1.0')),
    getApplicationName: jest.fn(() => Promise.resolve('My App')),
  };
});

it('renders correctly', () => {
  renderer.create(<BookMeetingRoom />);
});


