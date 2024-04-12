import tinycolor from "tinycolor2";

const colors = {
  white: "#FFFFFF",
  black: "#121212",
  facebook: "#1777f2",
  yellow: {
    400: "#fbbf24",
  },
  blue: {
    600: "#2563eb",
  },
  indigo: {
    600: "#4f46e5",
  },
  amber: {
    600: "#d97706",
  },
  cyan: {
    500: "#06b6d4",
  },
  emerald: {
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
  },
  primary: "#059669",
  secondary: "#0d9488",
  red: {
    400: "#f87171",
    600: "#dc2626",
  },
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#94a3b8",
    500: "#6B7280",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#111827",
  },
};

const neutralizeColor = (color: string) => {
  const hslColor = tinycolor(color).toHsl();
  const desaturatedColor = tinycolor({
    h: hslColor.h,
    s: hslColor.s * 0.5,
    l: hslColor.l * 0.8,
  }).toHexString();
  return desaturatedColor;
};

const lightenDarkenColor = (color: string, amount: number) => {
  const usePound = color[0] === "#";
  const hex = usePound ? color.slice(1) : color;
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amount;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amount;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
};

const lightPrimaryColor = lightenDarkenColor(colors.primary, 30);
const lightAccentColor = lightenDarkenColor(colors.secondary, 30);
const lightYellow = lightenDarkenColor(colors.yellow["400"], 30);
const lightBlue = lightenDarkenColor(colors.blue["600"], 30);
const lightIndigo = lightenDarkenColor(colors.indigo["600"], 30);
const lightAmber = lightenDarkenColor(colors.amber["600"], 30);
const lightCyan = lightenDarkenColor(colors.cyan["500"], 30);
const darkPrimaryColor = neutralizeColor(colors.primary);
const darkAccentColor = neutralizeColor(colors.secondary);
const darkYellow = neutralizeColor(colors.yellow["400"]);
const darkBlue = neutralizeColor(colors.blue["600"]);
const darkIndigo = neutralizeColor(colors.indigo["600"]);
const darkAmber = neutralizeColor(colors.amber["600"]);
const darkCyan = neutralizeColor(colors.cyan["500"]);
const darkEmerald300 = neutralizeColor(colors.emerald["300"]);

const lightTheme = {
  primary: lightPrimaryColor,
  text: colors.black,
  background: colors.white,
  border: "#E5E7EB",
  tint: lightPrimaryColor,
  tabIconDefault: "#7E7E7F",
  tabIconSelected: lightPrimaryColor,
  accent: lightAccentColor,
  yellow: lightYellow,
};

const darkTheme = {
  primary: darkPrimaryColor,
  text: colors.white,
  background: colors.black,
  border: "#4A5568",
  tint: darkPrimaryColor,
  tabIconDefault: "#9E9E9F",
  tabIconSelected: darkPrimaryColor,
  accent: darkAccentColor,
  yellow: darkYellow,
};

export default {
  common: {
    ...colors,
    lightBlue,
    lightIndigo,
    lightCyan,
    lightAmber,
    darkBlue,
    darkIndigo,
    darkCyan,
    darkAmber,
    darkEmerald300,
  },
  light: lightTheme,
  dark: darkTheme,
};
