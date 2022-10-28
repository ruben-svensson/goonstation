/obj/item/boardgame
	name = "game board"
	desc = "A generic game board?"
	icon = 'icons/obj/items/gameboard.dmi'
	icon_state = "chessboard"
	layer = 2.9

	var/game = "chess"
	var/pattern = "checkerboard"


	var/board_width = 8
	var/board_height = 8

	var/icon/custom_board = null
	/// If true, the board will be drawn with a checkerboard pattern automatically
	/// If false, the board will be drawn with the icon provided
	var/draw_custom_icon = TRUE

	var/board = list() // single dimensional board

	/// Apply custom styling, matches both in dm and tgui releated code
	var/styling = list(
		"tileColour1" = rgb(255, 224, 175),
		"tileColour2" = rgb(181,136,99),
	)

	var/starting_positions = list()

	// Store the users who are currently using the board
	// also track pawns they have selected and moving
	var/active_users = list()

	/**
	 * Removes all the pieces from the board
	 */
	proc/generateEmptyBoard()
		src.board = list()
		// Generate empty board
		for (var/i in 1 to board_height * board_width)
			src.board += ""

	/**
	 * Generates an empty starting position for any sized board
	 * with no pieces on it. Works like a clear board
	 */
	proc/setupEmptyStartingPosition()
		// Automatically generate preset for an empty board
		// Example of a 8x8 board
		// Fen: 8/8/8/8/8/8/8/8
		var/fen = ""
		for(var/y in 1 to src.board_height)
			fen += "[src.board_width]/"
		fen = copytext(fen, 1, length(fen)) // Remove the last slash

		src.starting_positions["Empty"] = fen

	/**
	 * Applies Forsyth-Edwards Notation (FEN) to the board
	 * FEN is a standard notation for describing a particular board position of a chess game.
	 */
	proc/applyFen(fen)
		src.board = list()
		var/filtered_fen = replacetext(fen, "/", "")
		for (var/char in splittext(filtered_fen, ""))
			if (isnum(text2num_safe(char)))
				for (var/i in 1 to text2num_safe(char))
					src.board += ""
			else
				src.board += char

		src.drawBoardIcon()

	proc/createPiece(var/fenCode, var/x, var/y)
		var/index = (y - 1) * board_width + x
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = fenCode

	proc/movePiece(var/x1, var/y1, var/x2, var/y2)
		var/index1 = (y1 - 1) * board_width + x
		var/index2 = (y2 - 1) * board_width + x2
		// return if index is out of bounds
		if (index1 < 1 || index1 > board_height * board_width)
			return
		if (index2 < 1 || index2 > board_height * board_width)
			return
		src.board[index2] = src.board[index1]
		src.board[index1] = ""

	proc/removePiece(var/x, var/y)
		var/index = (y - 1) * board_width + x
		// return if index is out of bounds
		if (index < 1 || index > board_height * board_width)
			return
		src.board[index] = ""
		src.drawBoardIcon()

	proc/selectPawn(ckey, pCode, pTeam, pGame)
		src.active_users[ckey]["selected"] = list(
			"code" = pCode,
			"team" = pTeam,
			"game" = pGame
		)

	proc/deselectPawn(ckey)
		src.active_users[ckey]["selected"] = null

	proc/placePawn(ckey, x, y)
		if (!src.active_users[ckey]["selected"])
			return
		var/pawn = src.active_users[ckey]["selected"]
		src.createPiece(pawn["code"], x, y)
		src.drawBoardIcon()
		playsound(src.loc, 'sound/impact_sounds/Wood_Hit_Small_1.ogg', 50, 1)

	proc/drawBoardIcon()
		if(!draw_custom_icon) return

		var/board_padding = 4
		var/width = (board_width * 3) + board_padding
		var/height = (board_height * 3) + board_padding

		src.bound_width = width
		src.bound_height = height

		src.custom_board = icon(src.icon, icon_state = "base")
		src.custom_board.Crop(1, 1, width, height)

		var/color1rgb = styling["tileColour1"]
		var/color2rgb = styling["tileColour2"]

		// Draw the background for the board
		var/list/RGB = rgb2num(color1rgb)
		var/darker = 0.9
		var/darkercolor1 = rgb(RGB[1] * darker, RGB[2] * darker, RGB[3] * darker)

		src.custom_board.DrawBox(darkercolor1, 0, 0, width, height)

		//reverse for (var/y in 1 to board_height)

		for (var/x in 1 to board_width)
			for (var/y in 1 to board_height)
				var/index = (y - 1) * board_width + x
				var/letter = src.board[index]

				// DrawBox uses x1, y1, x2, y2, each tile should be 2x2

				var/tile_size = 3

				var/tile_x1 = (x) * tile_size
				var/tile_y1 = (board_height - y + 1) * tile_size
				var/tile_x2 = tile_x1 + tile_size
				var/tile_y2 = tile_y1 + tile_size

				var/tile_color = color1rgb
				if ((x + y) % 2 == 0)
					tile_color = color2rgb
				src.custom_board.DrawBox(tile_color, tile_x1, tile_y1, tile_x2-1, tile_y2-1)

				var/pawn_height = 1
				if(letter == "p" || letter == "P")
					pawn_height = 0
				if(letter == "k" || letter == "K")
					pawn_height = 2

				if (letter != "")
					if (letter == uppertext(letter))
						src.custom_board.DrawBox(rgb(255, 255, 255), tile_x1 + 1, tile_y1 + 1, tile_x1 + 1, tile_y1 + 1 + pawn_height)
					else
						src.custom_board.DrawBox(rgb(0, 0, 0), tile_x1 + 1, tile_y1 + 1, tile_x1 + 1, tile_y1 + 1 + pawn_height)


			src.icon = custom_board


	ui_interact(mob/user, datum/tgui/ui)
		ui = tgui_process.try_update_ui(user, src, ui)
		if(!ui)
			ui = new(user, src, "Boardgame")
			ui.open()

			if(!src.active_users[user.ckey])
				src.active_users[user.ckey] = list(
					"ckey" = user.ckey,
					"name" = user.name,
					"mouseX" = 0,
					"mouseY" = 0,
					"selected" = null
				)

	ui_static_data(mob/user)
		. = list()
		.["boardInfo"] = list(
			"name" = src.name,
			"game" = src.game,
			"pattern" = src.pattern,
			"startingPositions" = src.starting_positions,
			"width" = src.board_width,
			"height" = src.board_height,
		)


	ui_data(mob/user)
		. = list()
		.["board"] = src.board
		.["styling"] = src.styling
		.["users"] = src.active_users
		.["currentUser"] = user.ckey

	ui_act(action, list/params, datum/tgui/ui, datum/ui_state/state)
		. = ..()
		if(.)
			return
		switch(action)
			if("pawnMove")
				var/x1 = text2num(params["x1"]) + 1 //Convert to dm array
				var/y1 = text2num(params["y1"]) + 1 //Convert to dm array
				var/x2 = text2num(params["x2"]) + 1 //Convert to dm array
				var/y2 = text2num(params["y2"]) + 1 //Convert to dm array
				src.movePiece(x1, y1, x2, y2)
				. = TRUE
			if("pawnCreate")
				var/fenCode = params["fenCode"]
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.createPiece(fenCode, x, y)
				. = TRUE
			if("pawnRemove")
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.removePiece(x, y)
				. = TRUE
			if("pawnSelect")
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				var/ckey = params["ckey"]
				var/pCode = params["pCode"]
				var/pTeam = params["pTeam"]
				var/pGame = params["pGame"]
				src.selectPawn(ckey, pCode, pTeam, pGame, x, y)
				src.removePiece(x, y)
				. = TRUE
			if("pawnDeselect")
				var/ckey = params["ckey"]
				src.deselectPawn(ckey)
				. = TRUE
			if("pawnPlace")
				// Place the pawn on the board currently selected
				var/ckey = params["ckey"]
				var/x = text2num(params["x"]) + 1 //Convert to dm array
				var/y = text2num(params["y"]) + 1 //Convert to dm array
				src.placePawn(ckey, x, y)
				. = TRUE
			if("mouseMove")
				var/x = text2num(params["x"])
				var/y = text2num(params["y"])
				var/ckey = params["ckey"]
				src.active_users[ckey]["mouseX"] = x
				src.active_users[ckey]["mouseY"] = y
				. = TRUE
			if("applyFen")
				var/fen = params["fen"]
				src.applyFen(fen)
				. = TRUE

	ui_close(mob/user)
		src.active_users -= user
		. = ..()

	ui_status(mob/user, datum/ui_state/state)
		. = ..()
		if(. <= UI_CLOSE || !IN_RANGE(src, user, 10))
			return UI_CLOSE

	attack_hand(var/mob/user) // open browser window when board is clicked
		src.ui_interact(user)

	attackby(var/obj/item/I, mob/user)


	chess
		name = "chess board"
		desc = "It's a board for playing chess!"


		New()
			..()
			src.starting_positions["Starting Position"] = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

	chesshor
		name = "chess board horizontal"
		desc = "It's a board for playing chess, but more horizontally!"
		board_height = 6
		board_width = 12
		styling = list(
			"tileColour1" = rgb(32, 187, 45),
			"tileColour2" = rgb(92, 6, 95),
		)

		New()
			..()

	evilchess
		name = "evil chess board"
		desc = "It's a board for playing chess, but more evil!"
		board_width = 16
		board_height = 16
		styling = list(
				"tileColour1" = rgb(136, 10, 10),
				"tileColour2" = rgb(109,68,255),
		)

		New()
			..()

	New()
		..()
		src.generateEmptyBoard()
		src.setupEmptyStartingPosition()
		src.drawBoardIcon()

