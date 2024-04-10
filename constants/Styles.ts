import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inpField: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ababab",
    borderRadius: 8,
    padding: 10,
  },
  btn: {
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  removedBackground: {
    backgroundColor: "transparent",
  },
  footer: {
    position: "absolute",
    alignItems: "center",
    paddingVertical: 16,
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
