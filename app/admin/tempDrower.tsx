// "use client";

// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import AdminNav from "../components/Admin/AdminNav";
// import { HiBars3 } from "react-icons/hi2";
// import Link from "next/link";
// import Image from "next/image";
// import { useMediaQuery } from "@mui/material";
// import { AppLogo } from "@/public/assets";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),

//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer - 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     paddingLeft: `calc(${theme.spacing(8)} + 1px)`,
//   },
//   ...(open && {
//     paddingLeft: `0`,
//     [theme.breakpoints.up("sm")]: {
//       paddingLeft: `0`,
//     },
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,

//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function MiniDrawer({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         open={open}
//         className="!bg-white !text-slate-600 "
//       >
//         <Toolbar className="">
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleToggle}
//             edge="start"
//             sx={{
//               marginRight: 5,
//             }}
//           >
//             <HiBars3 />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Mini variant drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <Link
//           href={`/`}
//           className={`text-[#211436] text-[20px]  font-normal flex items-center gap-4 py-[16px] px-[16px]   `}
//         >
//           <Image src={AppLogo} alt="logo" className="h-6 w-auto   " />
//           <span className="drop-shadow-sm"> OriginalTech</span>
//         </Link>

//         <AdminNav open={open} />
//       </Drawer>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           ...(isSmallScreen && {
//             width: "100%",
//             marginLeft: 0,
//           }),
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }
