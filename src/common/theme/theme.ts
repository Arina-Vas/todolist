import {createTheme} from "@mui/material";
import {ThemeMode} from "@/app/app-slice.ts";
import {pink} from "@mui/material/colors";

export const getTheme = (themeMode: ThemeMode) => {
   return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#f06292',
            },
            secondary: pink,
        },

    });
}