import { PieceType } from '../pieces';

/* eslint-disable max-len */
const pieces: PieceType[] = [];

pieces.push({
  fenCode: 'd',
  name: 'Man (Black)',
  game: 'draughts',
  image: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOS43OW1tIiBoZWlnaHQ9IjkuNzltbSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOS43OSA5Ljc5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KIDxtZXRhZGF0YT4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMCAtMzIuNzg2KSI+CiAgPGcgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyI+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiLz4KICAgPGNpcmNsZSBjeD0iMzQuODk1IiBjeT0iMjUuODk1IiByPSIzIi8+CiAgPC9nPgogIDxnPgogICA8Y2lyY2xlIGN4PSIzNC44OTUiIGN5PSIzNy42ODEiIHI9IjQuODk1Ii8+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjM3LjY4MSIgcj0iMyIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogIDwvZz4KICA8Zz4KICAgPGNpcmNsZSBjeD0iNDcuMzAzIiBjeT0iMzcuNjgxIiByPSI0Ljg5NSIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIzNy42ODEiIHI9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjExNTc2IDAgMCAuMTE1NzYgNDQuNjk4IDM1LjA0MSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgIDxwYXRoIGQ9Im0yMi41IDExLjYzdi01LjYzbS0yLjUgMmg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CiAgICA8cGF0aCBkPSJtMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTEyLjUgMzdjNS41IDMuNSAxNC41IDMuNSAyMCAwdi03czktNC41IDYtMTAuNWMtNC02LjUtMTMuNS0zLjUtMTYgNHYzLjUtMy41Yy0yLjUtNy41LTEyLTEwLjUtMTYtNC0zIDYgNiAxMC41IDYgMTAuNXY3Ii8+CiAgICA8cGF0aCBkPSJtMTIuNSAzMGM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwbS0yMCAzLjVjNS41LTMgMTQuNS0zIDIwIDAiLz4KICAgPC9nPgogIDwvZz4KICA8ZyBmaWxsPSIjZmZmIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgIDxjaXJjbGUgY3g9IjQ3LjMwMyIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIyNS44OTUiIHI9IjMiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCguMTE1NzYgMCAwIC4xMTU3NiA0NC43NTYgMjMuMDY4KSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICA8cGF0aCBkPSJtMjIuNSAxMS42M3YtNS42M20tMi41IDJoNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KICAgIDxwYXRoIGQ9Im0xMi41IDM3YzUuNSAzLjUgMTQuNSAzLjUgMjAgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDR2My41LTMuNWMtMi41LTcuNS0xMi0xMC41LTE2LTQtMyA2IDYgMTAuNSA2IDEwLjV2NyIvPgogICAgPHBhdGggZD0ibTEyLjUgMzBjNS41LTMgMTQuNS0zIDIwIDBtLTIwIDMuNWM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo`,
});

pieces.push({
  fenCode: 'm',
  name: 'King  (Black)',
  game: 'draughts',
  image: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOS43OW1tIiBoZWlnaHQ9IjkuNzltbSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOS43OSA5Ljc5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KIDxtZXRhZGF0YT4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00Mi40MDggLTMyLjc4NikiPgogIDxnIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTciPgogICA8Y2lyY2xlIGN4PSIzNC44OTUiIGN5PSIyNS44OTUiIHI9IjQuODk1Ii8+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjI1Ljg5NSIgcj0iMyIvPgogIDwvZz4KICA8Zz4KICAgPGNpcmNsZSBjeD0iMzQuODk1IiBjeT0iMzcuNjgxIiByPSI0Ljg5NSIvPgogICA8Y2lyY2xlIGN4PSIzNC44OTUiIGN5PSIzNy42ODEiIHI9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICA8L2c+CiAgPGc+CiAgIDxjaXJjbGUgY3g9IjQ3LjMwMyIgY3k9IjM3LjY4MSIgcj0iNC44OTUiLz4KICAgPGNpcmNsZSBjeD0iNDcuMzAzIiBjeT0iMzcuNjgxIiByPSIzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIuMzk3Ii8+CiAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KC4xMTU3NiAwIDAgLjExNTc2IDQ0LjY5OCAzNS4wNDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICA8cGF0aCBkPSJtMjIuNSAxMS42M3YtNS42M20tMi41IDJoNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KICAgIDxwYXRoIGQ9Im0xMi41IDM3YzUuNSAzLjUgMTQuNSAzLjUgMjAgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDR2My41LTMuNWMtMi41LTcuNS0xMi0xMC41LTE2LTQtMyA2IDYgMTAuNSA2IDEwLjV2NyIvPgogICAgPHBhdGggZD0ibTEyLjUgMzBjNS41LTMgMTQuNS0zIDIwIDBtLTIwIDMuNWM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwIi8+CiAgIDwvZz4KICA8L2c+CiAgPGcgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIyNS44OTUiIHI9IjQuODk1IiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICAgPGNpcmNsZSBjeD0iNDcuMzAzIiBjeT0iMjUuODk1IiByPSIzIiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjExNTc2IDAgMCAuMTE1NzYgNDQuNzU2IDIzLjA2OCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPgogICAgPHBhdGggZD0ibTIyLjUgMTEuNjN2LTUuNjNtLTIuNSAyaDUiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KICAgIDxwYXRoIGQ9Im0yMi41IDI1czQuNS03LjUgMy0xMC41YzAgMC0xLTIuNS0zLTIuNXMtMyAyLjUtMyAyLjVjLTEuNSAzIDMgMTAuNSAzIDEwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CiAgICA8cGF0aCBkPSJtMTIuNSAzN2M1LjUgMy41IDE0LjUgMy41IDIwIDB2LTdzOS00LjUgNi0xMC41Yy00LTYuNS0xMy41LTMuNS0xNiA0djMuNS0zLjVjLTIuNS03LjUtMTItMTAuNS0xNi00LTMgNiA2IDEwLjUgNiAxMC41djciLz4KICAgIDxwYXRoIGQ9Im0xMi41IDMwYzUuNS0zIDE0LjUtMyAyMCAwbS0yMCAzLjVjNS41LTMgMTQuNS0zIDIwIDBtLTIwIDMuNWM1LjUtMyAxNC41LTMgMjAgMCIvPgogICA8L2c+CiAgPC9nPgogPC9nPgo8L3N2Zz4K`,
});

pieces.push({
  fenCode: 'D',
  name: 'Man (White)',
  game: 'draughts',
  image: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAuMTg3bW0iIGhlaWdodD0iMTAuMTg3bW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEwLjE4NyAxMC4xODciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogPG1ldGFkYXRhPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5LjgwMiAtMjAuODAyKSI+CiAgPGcgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyI+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiLz4KICAgPGNpcmNsZSBjeD0iMzQuODk1IiBjeT0iMjUuODk1IiByPSIzIi8+CiAgPC9nPgogIDxnPgogICA8Y2lyY2xlIGN4PSIzNC44OTUiIGN5PSIzNy42ODEiIHI9IjQuODk1Ii8+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjM3LjY4MSIgcj0iMyIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogIDwvZz4KICA8Zz4KICAgPGNpcmNsZSBjeD0iNDcuMzAzIiBjeT0iMzcuNjgxIiByPSI0Ljg5NSIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIzNy42ODEiIHI9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjExNTc2IDAgMCAuMTE1NzYgNDQuNjk4IDM1LjA0MSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgIDxwYXRoIGQ9Im0yMi41IDExLjYzdi01LjYzbS0yLjUgMmg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CiAgICA8cGF0aCBkPSJtMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTEyLjUgMzdjNS41IDMuNSAxNC41IDMuNSAyMCAwdi03czktNC41IDYtMTAuNWMtNC02LjUtMTMuNS0zLjUtMTYgNHYzLjUtMy41Yy0yLjUtNy41LTEyLTEwLjUtMTYtNC0zIDYgNiAxMC41IDYgMTAuNXY3Ii8+CiAgICA8cGF0aCBkPSJtMTIuNSAzMGM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwbS0yMCAzLjVjNS41LTMgMTQuNS0zIDIwIDAiLz4KICAgPC9nPgogIDwvZz4KICA8ZyBmaWxsPSIjZmZmIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgIDxjaXJjbGUgY3g9IjQ3LjMwMyIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIyNS44OTUiIHI9IjMiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCguMTE1NzYgMCAwIC4xMTU3NiA0NC43NTYgMjMuMDY4KSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICA8cGF0aCBkPSJtMjIuNSAxMS42M3YtNS42M20tMi41IDJoNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KICAgIDxwYXRoIGQ9Im0xMi41IDM3YzUuNSAzLjUgMTQuNSAzLjUgMjAgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDR2My41LTMuNWMtMi41LTcuNS0xMi0xMC41LTE2LTQtMyA2IDYgMTAuNSA2IDEwLjV2NyIvPgogICAgPHBhdGggZD0ibTEyLjUgMzBjNS41LTMgMTQuNS0zIDIwIDBtLTIwIDMuNWM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=`,
});

pieces.push({
  fenCode: 'M',
  name: 'King (White)',
  game: 'draughts',
  image: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAuMTg3bW0iIGhlaWdodD0iMTAuMTg3bW0iIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEwLjE4NyAxMC4xODciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogPG1ldGFkYXRhPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQyLjIwOSAtMjAuODAyKSI+CiAgPGcgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyI+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiLz4KICAgPGNpcmNsZSBjeD0iMzQuODk1IiBjeT0iMjUuODk1IiByPSIzIi8+CiAgPC9nPgogIDxnPgogICA8Y2lyY2xlIGN4PSIzNC44OTUiIGN5PSIzNy42ODEiIHI9IjQuODk1Ii8+CiAgIDxjaXJjbGUgY3g9IjM0Ljg5NSIgY3k9IjM3LjY4MSIgcj0iMyIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogIDwvZz4KICA8Zz4KICAgPGNpcmNsZSBjeD0iNDcuMzAzIiBjeT0iMzcuNjgxIiByPSI0Ljg5NSIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIzNy42ODEiIHI9IjMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii4zOTciLz4KICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjExNTc2IDAgMCAuMTE1NzYgNDQuNjk4IDM1LjA0MSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgIDxwYXRoIGQ9Im0yMi41IDExLjYzdi01LjYzbS0yLjUgMmg1IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+CiAgICA8cGF0aCBkPSJtMjIuNSAyNXM0LjUtNy41IDMtMTAuNWMwIDAtMS0yLjUtMy0yLjVzLTMgMi41LTMgMi41Yy0xLjUgMyAzIDEwLjUgMyAxMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTEyLjUgMzdjNS41IDMuNSAxNC41IDMuNSAyMCAwdi03czktNC41IDYtMTAuNWMtNC02LjUtMTMuNS0zLjUtMTYgNHYzLjUtMy41Yy0yLjUtNy41LTEyLTEwLjUtMTYtNC0zIDYgNiAxMC41IDYgMTAuNXY3Ii8+CiAgICA8cGF0aCBkPSJtMTIuNSAzMGM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwbS0yMCAzLjVjNS41LTMgMTQuNS0zIDIwIDAiLz4KICAgPC9nPgogIDwvZz4KICA8ZyBmaWxsPSIjZmZmIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgIDxjaXJjbGUgY3g9IjQ3LjMwMyIgY3k9IjI1Ljg5NSIgcj0iNC44OTUiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8Y2lyY2xlIGN4PSI0Ny4zMDMiIGN5PSIyNS44OTUiIHI9IjMiIHN0cm9rZS13aWR0aD0iLjM5NyIvPgogICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCguMTE1NzYgMCAwIC4xMTU3NiA0NC43NTYgMjMuMDY4KSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICA8cGF0aCBkPSJtMjIuNSAxMS42M3YtNS42M20tMi41IDJoNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPgogICAgPHBhdGggZD0ibTIyLjUgMjVzNC41LTcuNSAzLTEwLjVjMCAwLTEtMi41LTMtMi41cy0zIDIuNS0zIDIuNWMtMS41IDMgMyAxMC41IDMgMTAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KICAgIDxwYXRoIGQ9Im0xMi41IDM3YzUuNSAzLjUgMTQuNSAzLjUgMjAgMHYtN3M5LTQuNSA2LTEwLjVjLTQtNi41LTEzLjUtMy41LTE2IDR2My41LTMuNWMtMi41LTcuNS0xMi0xMC41LTE2LTQtMyA2IDYgMTAuNSA2IDEwLjV2NyIvPgogICAgPHBhdGggZD0ibTEyLjUgMzBjNS41LTMgMTQuNS0zIDIwIDBtLTIwIDMuNWM1LjUtMyAxNC41LTMgMjAgMG0tMjAgMy41YzUuNS0zIDE0LjUtMyAyMCAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=`,
});

export default pieces;
