import 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";
import BookMeetingRoom from '../src/view/BookRoom/BookMeetingRoom';
import Common from '../src/Common/Common';
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

const  {sortLocationData,sortAvailabilityData,sortCapacityData}  = require("../src/Common/Common")
//location based sorting unit test
describe('something', () => {
  it('should test something', () => {
    const mockResponse =
        [
            {
                "name": "Kopi-O",
                "capacity": "8",
                "level": "7",
                "availability": {
                    "08:00": "1",
                }
            },
            {
                "name": "Teh-O",
                "capacity": "8",
                "level": "8",
                "availability": {
                    "08:00": "1"
                }
            }
        ]
    const expectedSortedResponse =
        [
            {
                "name": "Teh-O",
                "capacity": "8",
                "level": "8",
                "availability": {
                    "08:00": "1"
                }
            } ,
            {
                "name": "Kopi-O",
                "capacity": "8",
                "level": "7",
                "availability": {
                    "08:00": "1",
                }
            }

        ]
    const sortedData = sortLocationData(mockResponse);
    expect(sortedData).toEqual(expectedSortedResponse);
  });
});

//capacity based sorting unit test
describe('something', () => {
  it('should test something', () => {
    const mockResponse =
        [
            {
                "name": "Kopi-O",
                "capacity": "8",
                "level": "7",
                "availability": {
                    "08:00": "1",
                }
            },
            {
                "name": "Teh-O",
                "capacity": "2",
                "level": "8",
                "availability": {
                    "08:00": "1"
                }
            }
        ]
    const expectedSortedResponse =
        [
            {"name":"Teh-O","capacity":"2","level":"8","availability":{"08:00":"1"}},
            {"name":"Kopi-O","capacity":"8","level":"7","availability":{"08:00":"1"}}

        ]
    const sortedData = sortCapacityData(mockResponse);
    expect(sortedData).toEqual(expectedSortedResponse);
  });
});

//availability based sorting unit test
describe('something', () => {
  it('should test something', () => {
    const mockResponse =
        [
            {
                "name": "Kopi-O",
                "capacity": "8",
                "level": "7",
                "availability": {
                    "08:00": "0",
                }
            },
            {
                "name": "Teh-O",
                "capacity": "2",
                "level": "8",
                "availability": {
                    "08:00": "1"
                }
            }
        ]
    const expectedSortedResponse =
        [
            {"name":"Kopi-O","capacity":"8","level":"7","availability":{"08:00":"0"}},
            {"name":"Teh-O","capacity":"2","level":"8","availability":{"08:00":"1"}}

        ]
    const sortedData = sortAvailabilityData(mockResponse);
    expect(sortedData).toEqual(expectedSortedResponse);
  });
});

