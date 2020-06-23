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
              "name": "Kopi-O",
              "capacity": "8",
              "level": "7",
              "availability": {
                  "08:00": "1",
                  "08:30": "1",
                  "09:00": "0",
                  "09:30": "0",
                  "10:00": "0",
                  "10:30": "0",
                  "11:00": "0",
                  "11:30": "0",
                  "12:00": "0",
                  "12:30": "0",
                  "13:00": "0",
                  "13:30": "0",
                  "14:00": "1",
                  "14:30": "1",
                  "15:00": "0",
                  "15:30": "0",
                  "16:00": "0",
                  "16:30": "0",
                  "17:00": "0",
                  "17:30": "0",
                  "18:00": "0",
                  "18:30": "0",
                  "19:00": "0",
                  "19:30": "0"
              }
          }
      ]

    fetchMock.mockIf(url, mockResponse);
    // Call method
    const isAvailable = await instance.parseResponse(mockResponse);
    expect(isAvailable.length).toEqual(1);
  });
});