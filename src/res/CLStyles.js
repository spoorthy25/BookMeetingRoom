import { StyleSheet } from "react-native";
import CLFonts from "./CLFonts";
import CLColors from "./CLColors";
export default CLStyles = StyleSheet.create({
  TITLE_MEDIUM: {
    fontFamily: CLFonts.Medium,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: CLColors.MAIN_BLACK
  },
  TITLE_MEDIUM_WHITE: {
    fontFamily: CLFonts.Medium,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0,
    color: CLColors.WHITE
  },
  H1Light_BLACK: {
    fontFamily: CLFonts.Light,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    color: CLColors.BLACK
  },
  H2MEDIUM: {
    fontFamily: CLFonts.Bold,
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.GRAY6
  },
  H2Light: {
    fontFamily: CLFonts.Light,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.GRAY6
  },
  H2Light_BLACK: {
    fontFamily: CLFonts.Light,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.BLACK
  },
  H2Italic_Green: {
    fontFamily: CLFonts.Italic,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.GREEN
  },
  H2Italic_Gray: {
    fontFamily: CLFonts.Italic,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.GRAY5
  },
  H3Light: {
    fontFamily: CLFonts.Light,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    color: CLColors.GRAY7
  }
});
