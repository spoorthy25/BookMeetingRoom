import 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import BookMeetingRoom from '../src/view/BookRoom/BookMeetingRoom';
import fetchMock from 'jest-fetch-mock';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

jest.mock('@react-native-community/netinfo', () => {
  return {
    getVersion: jest.fn(() => Promise.resolve('1.0')),
    getApplicationName: jest.fn(() => Promise.resolve('My App')),
  };
});

describe('Fetching Data', () => {

  it('getAvailableRooms', async () => {
    const url = 'https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json';
    const wrapper  = shallow(<BookMeetingRoom/>);
    const instance = wrapper.instance();
    const mockResponse =
        [
            {
                "time":"09:00",
                "availability":"1"
            }
        ]

    fetchMock.mockIf(url, mockResponse);
    // Call method
    const isAvailable = await instance.checkAvailability(mockResponse);
    expect(isAvailable).toEqual(1);
  });
});