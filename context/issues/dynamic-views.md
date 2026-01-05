I need a widget that works as follows:

- let's call this widget "dynamic view builder" (DVB)
- the widget works very similarly to a UI like that of VSCODE, where the user can see multiple files simultaneously, arrange them, hroziontally, vertically, and nest them (for example, one file in the left side, and in the right side a split view of one file at the top and one at the bottom)
- User can select from a list of existing widgets. Widgets are essentially react components in this context
- User can drag and drop widget into the main view of the DVB
- Once a widget is dragged into the DVB, it is displayed in a frame that fills available space
- User can drag another widget into the DVB view. Depending on where the user drags the widget, it will be dropped and placed in the left, right, top or bottom,m along with the previous widget
- User can drop a third widget into the DVB view, dropping it in the top, bottom, left or right, and aligning with previous widgets, and so on
- User can rezie the frame of existing widgets, and user can drag and drop exisiting widgets to reposition them
- for now, now widgets exist. You can create a mock widget for development purposes, with a simple text content
- the https://github.com/nomcopter/react-mosaic library is perfect for this task, use it (use bun to install it)
- I do not need tabs. I only need a mosaic-like UI where the user can create a widget view. No tabs whatsoever. One widget per frame.
- Persist layout to local storage. The user can save a layout (i.e. frame positioning, size and wigets) and load it. User can save as many layouts as they want, name them and load them. Also the last loaded layout persists so the user sees it on page load
- Use kebab-case for all file names