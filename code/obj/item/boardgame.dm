/obj/item/gameboard
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	layer = 2.9

	var/game = "chess"
	var/pattern = "checkerboard"

	var/board_width = 8
	var/board_height = 8
	var/board = list() // single dimensional board
	var/tgui_styling = list(
		"tileColour1" = "#f0d9b5",
		"tileColour2" = "#b58863",
	)


	proc/generateEmptyBoard()

		src.board = list()

		// Generate empty board
		for (var/i in 1 to board_height * board_width)
			src.board += ""


	proc/createPiece(var/fenCode, var/x, var/y)
		var/index = (x * board_width) + y - 1
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = fenCode

	proc/movePiece(var/x1, var/y1, var/x2, var/y2)
		var/index1 = (x1 * board_width) + y1 - 1
		var/index2 = (x2 * board_width) + y2 - 1
		// return if index is out of bounds
		if (index1 < 1 || index1 > board_height * board_width)
			return
		if (index2 < 1 || index2 > board_height * board_width)
			return
		src.board[index2] = src.board[index1]
		src.board[index1] = ""

	proc/removePiece(var/x, var/y)
		var/index = (x * board_width) + y - 1
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = ""


	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Boardgame")
			ui.open()

	ui_static_data(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = src.name,
			"game" = src.game,
			"pattern" = src.pattern,
			"width" = src.board_width,
			"height" = src.board_height,
		)

		.["styling"] = src.tgui_styling

	ui_data(mob/user)
		. = list()
		.["board"] = src.board

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return

	ui_close(mob/user)
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 10))
			return UI_CLOSE

	attack_hand(var/mob/user) // open browser window when board is clicked
		src.ui_interact(user)

	chess
		name = "chess board"
		desc = "It's a board for playing chess!"
		icon_state = "chessboard"

	chesshor
		name = "chess board horizontal"
		desc = "It's a board for playing chess, but more horizontally!"
		icon_state = "chessboard"
		board_height = 6
		board_width = 12

		New()
			tgui_styling = list(
				"tileColour1" = "#20bb2d",
				"tileColour2" = "#5c065f",
			)
			..()

	evilchess
		name = "evil chess board"
		desc = "It's a board for playing chess, but more evil!"
		board_width = 16
		board_height = 16

		New()
			tgui_styling = list(
				"tileColour1" = "#880a0a",
				"tileColour2" = "#6d44ff",
			)
			..()

	New()
		src.generateEmptyBoard()
		..()
