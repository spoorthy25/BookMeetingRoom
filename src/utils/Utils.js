import Moment, { min } from "moment";
import CLColors from "../res/CLColors";

//get the calendar current day
export const getCalendarDateObj = nextDays => {
  let mark = {};

  nextDays.forEach(day => {
    mark[Moment(new Date(day)).format("YYYY-MM-DD")] = {
      selected: true,
      marked: false,
      selectedColor: CLColors.MAIN_BLUE
    };
  });

  return mark;
};