import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

/**
 * theme.js provides theme, color, pallette and styling,
 * allowing for easy access to colors and toggling dark/light mode.
 * County logo is also toggled for mode selection.
 * 
 */

// Color design tokens - created using TailWind Extension
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#ccd9e1",
          200: "#99b3c3",
          300: "#678ea6",
          400: "#346888",
          500: "#01426a",
          600: "#013555",
          700: "#012840",
          800: "#001a2a",
          900: "#000d15",
        },
        greenAccent: {
          100: "#e2f3db",
          200: "#c4e7b7",
          300: "#54AE80",
          400: "#89ce6e",
          500: "#6cc24a",
          600: "#569b3b",
          700: "#41742c",
          800: "#2b4e1e",
          900: "#16270f",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#d0f1f0",
          200: "#a1e4e1",
          300: "#71d6d2",
          400: "#42c9c3",
          500: "#13bbb4",
          600: "#0f9690",
          700: "#0b706c",
          800: "#084b48",
          900: "#042524",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          900: "#ccd9e1",
          800: "#99b3c3",
          700: "#f2f0f0",
          600: "#346888",
          500: "#01426a",
          400: "#ccd9e1",
          300: "#012840",
          200: "#001a2a",
          100: "#000d15",
        },
        greenAccent: {
          900: "#e2f3db",
          800: "#c4e7b7",
          700: "#54AE80",
          600: "#89ce6e",
          500: "#6cc24a",
          400: "#569b3b",
          300: "#41742c",
          200: "#2b4e1e",
          100: "#16270f",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          900: "#d0f1f0",
          800: "#a1e4e1",
          700: "#71d6d2",
          600: "#42c9c3",
          500: "#13bbb4",
          400: "#0f9690",
          300: "#0b706c",
          200: "#084b48",
          100: "#042524",
        },
      }),
});

// Theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[800],
            },
            secondary: {
              main: colors.greenAccent[400], 
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[800],
            },
            img: `../../assets/logo_CSL.svg`,
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#ebe8e8", //#fcfcfc
            },
            img: `../../assets/logo_CSL_lightmode.svg`,
            
          }),
    },

    typography: {
      fontFamily: ["Chivo", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Chivo", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

/*
The following functions handle toggling light/dark mode 
*/
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
